import { APP_STATE_KEYS, AppState, AppStateService } from '../../app-core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConfig, AppConfigService } from '@annuadvent/ngx-core/app-config';

@Injectable({
  providedIn: 'root'
})
export class StoriesHomePageResolver {
  constructor(
    private AppStateService: AppStateService,
    private appConfigService: AppConfigService,
  ) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<AppState> {

    const appConfig: AppConfig = this.appConfigService.config;
    const pageSize = route?.data?.pageSize || appConfig.defaultPageSize;
    const categories = this.AppStateService.appStateValue[APP_STATE_KEYS.allLiveCategories];
    // Get ArticlesByFeatures
    const promiseArticlesByFeatures = this.AppStateService.setState(APP_STATE_KEYS.articlesByFeatures);

    // Get PageCategoryGroups
    const promisePageCategoryGroups = this.AppStateService.setState(APP_STATE_KEYS.pageCategoryGroups, {
      categories,
      pageSize,
    });

    const result = await Promise.all([promiseArticlesByFeatures, promisePageCategoryGroups])
      .catch(err => {
        console.error(err);
        return null;
      });

    return {
      [APP_STATE_KEYS.articlesByFeatures]: this.AppStateService.appStateValue[APP_STATE_KEYS.articlesByFeatures],
      [APP_STATE_KEYS.pageCategoryGroups]: this.AppStateService.appStateValue[APP_STATE_KEYS.pageCategoryGroups],
    }
  }
}
