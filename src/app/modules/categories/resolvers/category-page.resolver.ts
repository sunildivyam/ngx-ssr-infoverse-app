import { APP_STATE_KEYS, AppState, AppStateService } from '../../app-core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConfig, AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { PageCategoryGroup } from '@annuadvent/ngx-tools/fire-cms';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageResolver {
  constructor(
    private AppStateService: AppStateService,
    private appConfigService: AppConfigService,
    private utilsService: UtilsService
  ) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<PageCategoryGroup> {
    const appConfig: AppConfig = this.appConfigService.config;

    const categoryId = route.params['categoryId'];
    const currentStartPage = route.queryParams['page'];
    const pageSize = (route?.data?.pageSize || appConfig.defaultPageSize) * 2;
    const startPage = this.utilsService.totalTimeStringToUTCdateString(currentStartPage);

    // Dynamic stateName as this page's state depends upon categoryId and startPage
    const stateName = this.AppStateService.getDynamicStateName([APP_STATE_KEYS.pageCategoryGroup, categoryId, startPage]);

    const newAppState: AppState = await this.AppStateService.setState(stateName, {
      categoryId,
      pageSize,
      startPage,
      isForward: true
    })
      .catch(err => {
        console.error(err);
        return null;
      });

    return newAppState && newAppState[stateName] || null;
  }
}
