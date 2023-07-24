import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Category } from '@annuadvent/ngx-cms/category';
import { Filter, FilterTypes } from '@annuadvent/ngx-common-ui/filters';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { FIREBASE_AUTH_ROLES, FireAuthService } from '@annuadvent/ngx-tools/fire-auth';
import { PageCategories } from '@annuadvent/ngx-tools/fire-cms';
import { Subscription, filter } from 'rxjs';
import { MY_CATEGORIES_FILTERS, MY_CATEGORIES_FILTERS_FOR_ADMIN } from '../../constants/categories.constants';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { ARROWS } from '../../../app-core/constants/app-icons.constants';
import { DashboardMetaService } from '../../services/dashboard-meta.service';
import { DashboardMetaInfoEnum } from '../../enums/dashboard-meta.enums';

@Component({
  selector: 'app-manage-categories-page',
  templateUrl: './manage-categories-page.component.html',
  styleUrls: ['./manage-categories-page.component.scss']
})
export class ManageCategoriesPageComponent {
  pageMeta: MetaInfo = null;
  categories: Array<Category> = [];
  filteredCategories: Array<Category> = [];
  foundCategories: Array<Category> = [];
  searchKeys: Array<string> = ['id', 'metaInfo.title'];
  categoriesFilters: Array<Filter> = [...MY_CATEGORIES_FILTERS];

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
    private appConfigService: AppConfigService,
  ) {
    this.routeStartEvent = this.router.events
      .pipe(filter((ev) => ev instanceof NavigationStart))
      .subscribe(() => {
        this.loading = true;
        this.error = null;
      });

    this.routeEndEvent = this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe(() => {
        this.loading = false;
      });

    this.route.data.subscribe(async (data) => {
      this.pageMeta = this.dashboardMetaService.setDashboardPageMeta(DashboardMetaInfoEnum.categoriesPage);

      const isAdmin = await this.fireAuthService.currentUserHasRole(
        FIREBASE_AUTH_ROLES.ADMIN
      );
      if (isAdmin) {
        this.categoriesFilters = [
          ...MY_CATEGORIES_FILTERS,
          ...MY_CATEGORIES_FILTERS_FOR_ADMIN,
        ];
      }

      const pageCategories: PageCategories = data['manageCategories'] as PageCategories;
      this.categories = pageCategories?.categories || [];
      this.foundCategories = this.categories;
      this.filterCategories(this.categoriesFilters, this.foundCategories);
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.pageMeta = this.dashboardMetaService.setDashboardPageMeta(DashboardMetaInfoEnum.categoriesPage);
  }

  ngOnDestroy(): void {
    this.routeEndEvent.unsubscribe();
  }

  public onSearch(foundCategories: Array<Category>): void {
    this.foundCategories = foundCategories;
    this.filterCategories(this.categoriesFilters, this.foundCategories);
  }

  public filterCategories(
    filters: Array<Filter>,
    categories: Array<Category>
  ): void {
    this.filteredCategories = categories.filter((cat) => {
      let matches = true;
      filters.forEach((filter) => {
        if (filter.enabled) {
          if (filter.type === FilterTypes.SingleSelect) {
            if (filter.id === 'userId') {
              matches =
                filter.filter.value ===
                  (cat[filter.id] === this.fireAuthService.getCurrentUserId()) &&
                  matches === true
                  ? true
                  : false;
            } else {
              matches =
                filter.filter.value === cat[filter.id] && matches === true
                  ? true
                  : false;
            }
          } else if (filter.type === FilterTypes.MultiSelect) {
            if (filter.filter.selectedValues?.length) {
              filter.filter.selectedValues.forEach((selectedfeature) => {
                matches =
                  cat?.features?.includes(
                    selectedfeature[filter.filter.keyName]
                  ) && matches === true
                    ? true
                    : false;
              });
            }
          }
        }
      });
      return matches;
    });
  }

  public categoriesFiltersChanged(filters: Array<Filter>): void {
    this.categoriesFilters = filters;
    this.filterCategories(filters, this.foundCategories);
  }
}
