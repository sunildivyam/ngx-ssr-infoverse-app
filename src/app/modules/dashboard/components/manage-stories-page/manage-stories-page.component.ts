import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Article } from '@annuadvent/ngx-cms/article';
import { Filter, FilterTypes } from '@annuadvent/ngx-common-ui/filters';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { FIREBASE_AUTH_ROLES, FireAuthService } from '@annuadvent/ngx-tools/fire-auth';
import { PageArticles } from '@annuadvent/ngx-tools/fire-cms';
import { Subscription, filter } from 'rxjs';
import { MY_ARTICLES_FILTERS, MY_ARTICLES_FILTERS_FOR_ADMIN } from '../../constants/stories.constants';
import { ARROWS } from '../../../app-core/constants/app-icons.constants';
import { DashboardMetaInfoEnum } from '../../enums/dashboard-meta.enums';
import { DashboardMetaService } from '../../services/dashboard-meta.service';

@Component({
  selector: 'app-manage-stories-page',
  templateUrl: './manage-stories-page.component.html',
  styleUrls: ['./manage-stories-page.component.scss']
})
export class ManageStoriesPageComponent {
  pageMeta: MetaInfo = null;
  articles: Array<Article> = [];
  filteredArticles: Array<Article> = [];
  foundArticles: Array<Article> = [];
  searchKeys: Array<string> = ['id', 'metaInfo.title'];
  articlesFilters: Array<Filter> = [...MY_ARTICLES_FILTERS];

  loading: boolean = true;
  error: any;
  routeStartEvent: Subscription;
  routeEndEvent: Subscription;
  ARROWS = ARROWS;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private dashboardMetaService: DashboardMetaService,
    private fireAuthService: FireAuthService,
  ) {

    this.routeStartEvent = this.router.events.pipe(filter(ev => ev instanceof NavigationStart)).subscribe(() => {
      this.loading = true;
      this.error = null;
    });

    this.routeEndEvent = this.router.events.pipe(filter(ev => ev instanceof NavigationEnd)).subscribe(() => {
      this.loading = false;
    });

    this.route.data.subscribe(async data => {
      const isAdmin = await this.fireAuthService.currentUserHasRole(FIREBASE_AUTH_ROLES.ADMIN);
      if (isAdmin) {
        this.articlesFilters = [...MY_ARTICLES_FILTERS, ...MY_ARTICLES_FILTERS_FOR_ADMIN];
      }
      const pageArticles: PageArticles = data['manageStories'];
      this.articles = pageArticles?.articles || [];
      this.foundArticles = this.articles;
      this.filterArticles(this.articlesFilters, this.foundArticles);
      this.loading = false;
    })
  }

  ngOnInit(): void {
    this.pageMeta = this.dashboardMetaService.setDashboardPageMeta(DashboardMetaInfoEnum.storiesHomePage);
  }

  ngOnDestroy(): void {
    this.routeEndEvent.unsubscribe();
  }

  public onSearch(foundArticles: Array<Article>): void {
    this.foundArticles = foundArticles;
    this.filterArticles(this.articlesFilters, this.foundArticles);
  }

  public filterArticles(filters: Array<Filter>, articles: Array<Article>): void {
    this.filteredArticles = articles.filter(art => {
      let matches = true;
      filters.forEach(filter => {
        if (filter.enabled) {
          if (filter.type === FilterTypes.SingleSelect) {
            if (filter.id === 'userId') {
              matches = filter.filter.value === (art[filter.id] === this.fireAuthService.getCurrentUserId()) && matches === true ? true : false;
            } else {
              matches = filter.filter.value === art[filter.id] && matches === true ? true : false;
            }
          } else if (filter.type === FilterTypes.MultiSelect) {
            if (filter.filter.selectedValues?.length) {
              filter.filter.selectedValues.forEach(selectedfeature => {
                matches = art?.features?.includes(selectedfeature[filter.filter.keyName]) && matches === true ? true : false;
              });
            }
          }
        }
      })
      return matches;
    })
  }

  public articlesFiltersChanged(filters: Array<Filter>): void {
    this.articlesFilters = filters;
    this.filterArticles(filters, this.foundArticles);
  }
}
