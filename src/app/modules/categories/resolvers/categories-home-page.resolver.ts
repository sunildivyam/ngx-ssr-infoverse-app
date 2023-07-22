import { APP_STATE_KEYS, AppState, AppStateService } from '../../app-core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConfig, AppConfigService } from '@annuadvent/ngx-core/app-config';
import { PageCategoryGroup } from '@annuadvent/ngx-tools/fire-cms';

@Injectable({
  providedIn: 'root'
})
export class CategoryHomePageResolver {
  constructor(
    private AppStateService: AppStateService,
    private appConfigService: AppConfigService,
  ) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Array<PageCategoryGroup>> {

    const appConfig: AppConfig = this.appConfigService.config;
    const pageSize = route?.data?.pageSize || appConfig.defaultPageSize;
    const categories = this.AppStateService.appStateValue[APP_STATE_KEYS.allLiveCategories];

    const newAppState = await this.AppStateService.setState(APP_STATE_KEYS.pageCategoryGroups, {
      categories,
      pageSize,
    })
      .catch(err => {
        console.error(err);
        return null;
      });

    return newAppState && newAppState[APP_STATE_KEYS.pageCategoryGroups];
  }
}
