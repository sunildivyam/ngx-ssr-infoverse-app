import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Article } from '@annuadvent/ngx-cms/article';
import { Category } from '@annuadvent/ngx-cms/category';
import { MetaInfo, MetaService } from '@annuadvent/ngx-common-ui/meta';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { PageCategoryGroup } from '@annuadvent/ngx-tools/fire-cms';
import { Subscription, filter } from 'rxjs';
import { APP_STATE_KEYS, AppState, AppStateService } from '../../../app-core';
import { ARROWS } from '../../../app-core/constants/app-icons.constants';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {
  categoryId: string = '';
  category: Category | null | undefined = null;
  categoryArticles: Array<Article> = [];

  // Additional Articles and categroies
  pageCategoryGroups: Array<PageCategoryGroup> = [];
  // This will have orderBy(updated) field value of last article record from the list.
  // startPage: string = '';
  endPage: string = '';

  error: any;
  errorAllCategories: any;
  navigationEndSubscription: Subscription;
  ARROWS = ARROWS;

  constructor(
    public route: ActivatedRoute,
    private metaService: MetaService,
    private router: Router,
    private utilsService: UtilsService,
    private ngZone: NgZone,
    private appStateService: AppStateService,
  ) {

    this.route.data.subscribe((data) => {
      const appState: AppState = this.appStateService.appStateValue;

      this.categoryId = this.route.snapshot.params['categoryId'];
      const startPage = this.utilsService.totalTimeStringToUTCdateString(
        route.snapshot.queryParams['page']
      );

      const dynamicStateName = this.appStateService.getDynamicStateName(
        [
          APP_STATE_KEYS.pageCategoryGroup,
          this.categoryId,
          startPage
        ]
      );

      const pageCategoryGroup: PageCategoryGroup = appState[dynamicStateName];
      const pageCategoryGroups: Array<PageCategoryGroup> = appState[APP_STATE_KEYS.pageCategoryGroups];

      this.initPageWithStateData(pageCategoryGroup, pageCategoryGroups);
    });

    this.navigationEndSubscription = this.router.events.pipe(filter(ev => ev instanceof NavigationEnd)).subscribe(() => this.setPageMeta());
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.navigationEndSubscription.unsubscribe();
  }

  private initPageWithStateData(
    pageCategoryGroup: PageCategoryGroup,
    pageCategoryGroups: Array<PageCategoryGroup>,
  ): void {
    this.category = pageCategoryGroup?.category;
    this.pageCategoryGroups = pageCategoryGroups;

    if (!this.route.firstChild && (!this.category || !this.category.id)) {
      const paramCategoryId = this.route.snapshot.paramMap.get('categoryId');
      setTimeout(() => this.ngZone.run(() => this.router.navigate(['genre'], { queryParams: { categoryId: paramCategoryId }, skipLocationChange: false })));
    } else {
      this.categoryArticles = [...pageCategoryGroup?.pageArticles?.articles ?? [] as Array<Article>];
      this.endPage = this.utilsService.dateStringToTotalTimeString(pageCategoryGroup?.pageArticles?.endPage || '');
    }

    this.setPageMeta();
  }

  public setPageMeta(): void {

    if (!this.route.firstChild && this.category && this.category.id) {
      this.metaService.setPageMeta({
        ...this.category?.metaInfo as MetaInfo,
        title: `${this.category?.metaInfo?.title}`,
        url: `genre/${this.category?.id}`,
      });
    }
  }
}
