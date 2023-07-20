import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {
  FireAuthService,
  FIREBASE_AUTH_ROLES,
} from '@annuadvent/ngx-tools/fire-auth';
import { MetaInfo, MetaService } from '@annuadvent/ngx-common-ui/meta';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { Article } from '@annuadvent/ngx-cms/article';
import { ArticlesDataService } from '../../services/articles-data.service';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private dashboardMetaInfo: MetaInfo;
  isAuthor: boolean = false;
  isAdmin: boolean = false;
  routeEndEvent: Subscription;
  helpArticles: Array<Article> = [];
  errorCode: string = '';
  errorMessage: string = '';

  constructor(
    public fireAuthService: FireAuthService,
    private metaService: MetaService,
    private appConfigService: AppConfigService,
    private articlesDataService: ArticlesDataService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.dashboardMetaInfo = this.appConfigService.config.dashboard.dashboardMetaInfo;

    this.routeEndEvent = this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.route.firstChild) {
          this.metaService.setPageMeta({
            ...this.dashboardMetaInfo,
            title: `${this.dashboardMetaInfo.title} - ${this.appConfigService.config.metaInfo.title}`,
          });
        }
      });
  }

  ngOnInit(): void {
    this.isAuthorFn();
    this.isAdminFn();
    this.getHelpDocs();

    this.metaService.setPageMeta({
      ...this.dashboardMetaInfo,
      title: `${this.appConfigService.config.metaInfo.title} - ${this.dashboardMetaInfo.title}`,
    });
  }

  public async isAuthorFn(): Promise<boolean> {
    this.isAuthor = await this.fireAuthService.currentUserHasRole(
      FIREBASE_AUTH_ROLES.AUTHOR
    );

    return this.isAuthor;
  }

  public async isAdminFn(): Promise<boolean> {
    this.isAdmin = await this.fireAuthService.currentUserHasRole(
      FIREBASE_AUTH_ROLES.ADMIN
    );

    return this.isAdmin;
  }

  ngOnDestroy(): void {
    this.routeEndEvent.unsubscribe();
  }

  public onOutletActivated(): void { }

  public async getHelpDocs() {
    this.errorCode = '';
    this.errorMessage = '';

    this.helpArticles = await this.articlesDataService.getHelpDocs()
      .catch(err => {
        this.errorCode = err.code || err.status || 'UNKNOWN';
        this.errorMessage = err.message || err.text || err || 'Something went wrong';
        return null;
      });
  }
}
