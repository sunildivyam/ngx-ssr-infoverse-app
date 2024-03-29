import { Component, NgZone } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MetaInfo } from "@annuadvent/ngx-common-ui/meta";
import { Article, PageCategoryGroup } from "@annuadvent/ngx-tools/fire-cms";
import { Subscription, filter } from "rxjs";
import { AppStateService } from "../../../app-core/services/app-state.service";
import { AppState } from "../../../app-core/interfaces/app-state.interface";
import { APP_STATE_KEYS } from "../../../app-core/constants/app-state.constants";
import { ArticleFeatures } from "@annuadvent/ngx-cms/article";
import { Category } from "@annuadvent/ngx-cms/category";
import { ARROWS } from "../../../app-core/constants/app-icons.constants";
import { StoriesMetaInfoEnum } from "../../enums/stories-meta.enums";
import { StoriesMetaService } from "../../services/stories-meta.service";

@Component({
  selector: "app-stories-home-page",
  templateUrl: "./stories-home-page.component.html",
  styleUrls: ["./stories-home-page.component.scss"],
})
export class StoriesHomePageComponent {
  pageMeta: MetaInfo = null;
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
  notFoundArticleId: string = "";
  ARROWS = ARROWS;

  constructor(
    public route: ActivatedRoute,
    private categoriesMetaService: StoriesMetaService,
    private router: Router,
    private appStateService: AppStateService
  ) {
    this.appStateService.appState.subscribe((appState: AppState) => {
      this.pageCategoryGroups = appState[APP_STATE_KEYS.pageCategoryGroups];
      this.articlesByFeatures =
        appState[APP_STATE_KEYS.articlesByFeatures] || [];

      this.initPageWithStateData();
    });

    this.navigationEndSubscription = this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe(() => this.setPageMeta());

    this.route.queryParams.subscribe((params) => {
      // Sets not found article ids, in case user is redirected here from respective pages.
      this.notFoundArticleId = params["articleId"] || "";
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.navigationEndSubscription.unsubscribe();
  }

  private initPageWithStateData(): void {
    this.primeShowArticles = this.articlesByFeatures.filter((art) =>
      art.features.includes(ArticleFeatures.primeShow)
    );
    this.footerShowArticles = this.articlesByFeatures.filter((art) =>
      art.features.includes(ArticleFeatures.footerShow)
    );
    this.mainShowArticles = this.articlesByFeatures.filter((art) =>
      art.features.includes(ArticleFeatures.mainShow)
    );
    this.primeShowAsideArticles = this.articlesByFeatures.filter((art) =>
      art.features.includes(ArticleFeatures.primeShowAside)
    );
    this.featuredArticles = this.articlesByFeatures.filter((art) =>
      art.features.includes(ArticleFeatures.featured)
    );
    this.allCategories = this.pageCategoryGroups?.map((pg) => pg.category);

    this.allCategoriesArticles = [];
    this.pageCategoryGroups?.forEach((pcg) => {
      this.allCategoriesArticles = [
        ...pcg.pageArticles.articles,
        ...this.allCategoriesArticles,
      ];
    });

    this.setPageMeta();
  }

  public setPageMeta(): void {
    this.pageMeta = this.categoriesMetaService.setStoriesPageMeta(
      StoriesMetaInfoEnum.storiesHomePage
    );
  }
}
