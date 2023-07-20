import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@annuadvent/ngx-cms/category';
import { MetaService } from '@annuadvent/ngx-common-ui/meta';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { FIREBASE_AUTH_ROLES, FireAuthService } from '@annuadvent/ngx-tools/fire-auth';
import { FireCategoriesHttpService } from '@annuadvent/ngx-tools/fire-cms';
import { FireStorageImageSpecs, FirebaseConfig } from '@annuadvent/ngx-tools/fire-common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-category-page',
  templateUrl: './manage-category-page.component.html',
  styleUrls: ['./manage-category-page.component.scss']
})
export class ManageCategoryPageComponent {
  readonly ADD_CATEGORY = 'add';
  category!: Category | null;
  categoryId: string = '';

  error: any = null;
  found: boolean = false;
  loading: boolean = true;
  paramsSubscription: Subscription;
  userRoles: Array<string> = [];
  isAdmin: boolean = false;
  isAuthor: boolean = false;
  postfixUniqueId: boolean = true;
  showModal: boolean = false;
  imageHelpText: string = '';

  constructor(
    private fireCategoriesHttpService: FireCategoriesHttpService,
    private fireAuthService: FireAuthService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private appConfigService: AppConfigService,
  ) {

    const imageSpecs = (this.appConfigService.firebase as FirebaseConfig).storage.imageDimensions;

    this.imageHelpText = this.getImageSpecsString(imageSpecs);
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.getCategory(this.categoryId);
    });

  }

  private getImageSpecsString(imageSpecs: FireStorageImageSpecs): string {
    const { minWidth, minHeight, maxWidth, maxHeight, maxKBs } = imageSpecs;

    return `Allowed Image specification: 1Kb <= size <= ${maxKBs}Kbs | ${minWidth}px <= width <= ${maxWidth}px | ${minHeight}px <= height <= ${maxHeight}px`;
  }

  ngOnInit(): void {
    // this.metaService.setPageMeta({ ...dashboardMyCategoryMetaInfo, title: `${appConfig.metaInfo.title} - ${dashboardMyCategoryMetaInfo.title}` });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  public get isNewCategoryPage(): boolean {
    return this.categoryId === this.ADD_CATEGORY;
  }

  public async getCategory(id: string) {
    this.error = null;
    this.loading = true;
    this.found = true;
    this.category = null;
    this.userRoles = await this.fireAuthService.getCurrentUserRoles();
    this.isAdmin = this.userRoles.includes(FIREBASE_AUTH_ROLES.ADMIN);
    this.isAuthor = this.userRoles.includes(FIREBASE_AUTH_ROLES.AUTHOR);

    if (id !== this.ADD_CATEGORY) {
      const getCategoryPromise: Promise<Category> = this.isAdmin ?
        this.fireCategoriesHttpService.getCategory(id) :
        this.fireCategoriesHttpService.getUsersCategory(this.fireAuthService.getCurrentUserId(), id);

      getCategoryPromise.then((cat: Category) => {
        if (cat) {
          this.category = { ...cat };
        } else {
          this.found = false;
          this.error = { code: '404', message: `Category does not exist - ${id}` };
        }

        this.loading = false;
      })
        .catch(error => {
          this.error = error;
          this.loading = false;
          this.found = false;
        });
    } else {
      this.found = true;
      this.loading = false;
    }
  }

  public saveClicked(category: Category): void {
    this.category = { ...category };
    this.error = null;
    this.loading = true;
    let savePromise;
    if (this.isNewCategoryPage) {
      savePromise = this.fireCategoriesHttpService.addCategory(this.category);
    } else {
      savePromise = this.fireCategoriesHttpService.updateCategory(this.category);
    }

    savePromise.then((cat: Category) => {
      this.category = { ...cat };
      this.loading = false;
      if (this.isNewCategoryPage) {
        this.router.navigate([this.category.id], { relativeTo: this.route.parent });
      }
    })
      .catch(error => {
        this.error = error;
        this.loading = false;
      });
  }

  public isLiveClicked(category: Category): void {
    this.category = { ...category };
    this.error = null;
    this.loading = true;
    if (!this.isNewCategoryPage) {
      this.fireCategoriesHttpService.setCategoryLive(this.category)
        .then((cat: Category) => {
          this.category = { ...cat };
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  public inReviewClicked(category: Category): void {
    this.category = { ...category };
    this.error = null;
    this.loading = true;
    if (!this.isNewCategoryPage) {
      this.fireCategoriesHttpService.setCategoryUpForReview(this.category)
        .then((cat: Category) => {
          this.category = { ...cat };
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  public deleteClicked(category: Category): void {
    this.showModal = true;
  }


  public deleteCancelled(): void {
    this.showModal = false;
  }

  public deleteConfirmed(): void {
    this.showModal = false;
    this.loading = true;
    this.error = null;
    this.fireCategoriesHttpService.deleteCategory(this.category)
      .then(success => {
        if (success === true) {
          this.router.navigate(['.'], { relativeTo: this.route.parent });
        } else {
          throw new Error('Something went wrong, please try again later.');
        }
        this.loading = false;
      })
      .catch(error => {
        this.error = error;
        this.loading = false;
      });
  }

  public categoryChanged(category: Category): void {
    const appConfig = this.appConfigService.config;
    category.metaInfo.site_name = appConfig.metaInfo.title;
    category.metaInfo['article:author'] = category.metaInfo['article:author'] || appConfig.metaInfo['article:author'];
    category.metaInfo.author = category.metaInfo.author || appConfig.metaInfo.author;
  }
}
