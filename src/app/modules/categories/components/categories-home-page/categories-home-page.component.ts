import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { Article, PageCategoryGroup } from '@annuadvent/ngx-tools/fire-cms';
import { Subscription, filter } from 'rxjs';
import { APP_STATE_KEYS, AppState, AppStateService } from '../../../app-core';
import { ARROWS } from '../../../app-core/constants/app-icons.constants';
import { CategoriesMetaService } from '../../services/categories-meta.service';
import { CategoriesMetaInfoEnum } from '../../enums/categories-meta.enums';

@Component({
  selector: 'app-categories-home-page',
  templateUrl: './categories-home-page.component.html',
  styleUrls: ['./categories-home-page.component.scss']
})
export class CategoriesHomePageComponent {
  pageMeta: MetaInfo = null;
  pageCategoryGroups: Array<PageCategoryGroup> = [];
  navigationEndSubscription: Subscription;
  allCategoriesArticles: Array<Article> = [];
  notFoundCategoryId: string = '';
  ARROWS = ARROWS;

  constructor(
    public route: ActivatedRoute,
    private categoriesMetaService: CategoriesMetaService,
    private router: Router,
    private utilsService: UtilsService,
    private ngZone: NgZone,
    private appConfigService: AppConfigService,
    private appStateService: AppStateService,
  ) {

    this.appStateService.appState.subscribe((appState: AppState) => {
      const pageCategoryGroups: Array<PageCategoryGroup> = appState[APP_STATE_KEYS.pageCategoryGroups];

      this.initPageWithStateData(pageCategoryGroups);
    });

    this.navigationEndSubscription = this.router.events.pipe(
      filter(
        ev => ev instanceof NavigationEnd)).subscribe(
          () => {
            this.pageMeta = this.categoriesMetaService.setCategoriesPageMeta(CategoriesMetaInfoEnum.categoriesHomePage);
          });

    this.route.queryParams.subscribe((params) => {
      // Sets not found category and/or article ids, in case user is redirected here from respective pages.
      this.notFoundCategoryId = params['categoryId'] || '';
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.navigationEndSubscription.unsubscribe();
  }

  private initPageWithStateData(
    pageCategoryGroups: Array<PageCategoryGroup>,
  ): void {

    this.pageCategoryGroups = pageCategoryGroups;
    this.allCategoriesArticles = [];
    pageCategoryGroups?.forEach(pcg => {
      this.allCategoriesArticles = [...pcg.pageArticles.articles, ...this.allCategoriesArticles];
    });

    this.pageMeta = this.categoriesMetaService.setCategoriesPageMeta(CategoriesMetaInfoEnum.categoriesHomePage);
  }

}
