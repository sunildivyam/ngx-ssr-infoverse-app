import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MetaService } from '@annuadvent/ngx-common-ui/meta';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { Article, PageCategoryGroup } from '@annuadvent/ngx-tools/fire-cms';
import { Subscription, filter } from 'rxjs';
import { AppStateService } from '../../../app-core/services/app-state.service';
import { AppState } from '../../../app-core/interfaces/app-state.interface';
import { APP_STATE_KEYS } from '../../../app-core/constants/app-state.constants';
import { ArticleFeatures } from '@annuadvent/ngx-cms/article';
import { Category } from '@annuadvent/ngx-cms/category';
import { ARROWS } from '../../../app-core/constants/app-icons.constants';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss']
})
export class StoryPageComponent {
  articleId: string = '';
  article: Article = null;
  pageCategoryGroups: Array<PageCategoryGroup> = [];
  articlesByFeatures: Array<Article> = [];
  primeShowArticles: Array<Article> = [];
  footerShowArticles: Array<Article> = [];
  mainShowArticles: Array<Article> = [];
  primeShowAsideArticles: Array<Article> = [];
  featuredArticles: Array<Article> = [];
  allCategoriesArticles: Array<Article> = [];
  allCategories: Array<Category> = [];

  navigationEndSubscription: Subscription;
  notFoundArticleId: string = '';
  ARROWS = ARROWS;

  constructor(
    public route: ActivatedRoute,
    private metaService: MetaService,
    private router: Router,
    private utilsService: UtilsService,
    private ngZone: NgZone,
    private appConfigService: AppConfigService,
    private appStateService: AppStateService,
  ) {

    this.route.params.subscribe(params => {
      this.articleId = params['articleId'];
    })

    this.route.data.subscribe(data => {
      this.article = data['storyPage'];
      if (!this.route.firstChild && (!this.article || !this.article.id)) {
        const paramArticleId = this.route.snapshot.paramMap.get('articleId');
        setTimeout(() => this.ngZone.run(() => this.router.navigate(['stories'], { queryParams: { articleId: paramArticleId }, skipLocationChange: false })));
      } else {
        this.setPageMeta();
      }
    });

    this.appStateService.appState.subscribe((appState: AppState) => {
      this.pageCategoryGroups = appState[APP_STATE_KEYS.pageCategoryGroups];
      this.articlesByFeatures = appState[APP_STATE_KEYS.articlesByFeatures] || [];

      this.initPageWithStateData();
    });

    this.navigationEndSubscription = this.router.events.pipe(filter(ev => ev instanceof NavigationEnd)).subscribe(() => this.setPageMeta());

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.navigationEndSubscription.unsubscribe();
  }

  private initPageWithStateData(): void {
    this.primeShowArticles = this.articlesByFeatures.filter(art => art.features.includes(ArticleFeatures.primeShow));
    this.footerShowArticles = this.articlesByFeatures.filter(art => art.features.includes(ArticleFeatures.footerShow));
    this.mainShowArticles = this.articlesByFeatures.filter(art => art.features.includes(ArticleFeatures.mainShow));
    this.primeShowAsideArticles = this.articlesByFeatures.filter(art => art.features.includes(ArticleFeatures.primeShowAside));
    this.featuredArticles = this.articlesByFeatures.filter(art => art.features.includes(ArticleFeatures.featured));
    this.allCategories = this.pageCategoryGroups?.map(pg => pg.category);

    this.allCategoriesArticles = [];
    this.pageCategoryGroups?.forEach(pcg => {
      this.allCategoriesArticles = [...pcg.pageArticles.articles, ...this.allCategoriesArticles];
    });
  }

  public setPageMeta(): void {
    const appConfig = this.appConfigService.config;
  }
}
