import { Injectable } from '@angular/core';
import { APP_STATE_KEYS } from '../constants/app-state.constants';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { MenuItem } from '@annuadvent/ngx-common-ui/menu';
import { FireArticlesHttpService, FireCategoriesHttpService, PageArticles, PageCategoryGroup } from '@annuadvent/ngx-tools/fire-cms';
import { Category } from '@annuadvent/ngx-cms/category';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(
    private appConfigService: AppConfigService,
    private fireCategoriesHttpService: FireCategoriesHttpService,
    private fireArticlesHttpService: FireArticlesHttpService,
  ) { }

  public async getValue(stateName: string, params: any = null): Promise<any> {
    let value: any = null;

    // this is done to support dynamic stateNames, first segment is static stateName and rest separated by _ is dynamic stateName.
    if (stateName.indexOf('_')) {
      stateName = stateName.split('_')[0];
    }

    switch (stateName) {
      case APP_STATE_KEYS.allLiveCategories:
        value = await this.getAllLiveCategories();
        break;
      case APP_STATE_KEYS.pageCategoryGroup:
        value = await this.getCategoryPageGroup(params);
        break;
      case APP_STATE_KEYS.pageCategoryGroups:
        value = await this.getCategoryPageGroups(params);
        break;
      // case APP_STATE_KEYS.somestateKey:
      //   value = await this.getValueForSomeStateKey(params);
      //   break;
      default:
      // NOTE: Add one separate switch case for each AppState items, above
    }

    return value;
  }

  private async getAllLiveCategories(): Promise<Array<Category>> {
    return await this.fireCategoriesHttpService
      .getAllLiveShallowCategories()
      .catch(err => {
        console.error(err);
        return null;
      });
  }

  private async getCategoryPageGroup(params: any): Promise<PageCategoryGroup> {
    if (!params) {
      console.error(`categoryId, pageSize, startPage and isForward are required.`);
      return null;
    }

    return await this.fireCategoriesHttpService
      .getLiveCategoryWithOnePageShallowArticles(
        params?.categoryId,
        params?.pageSize,
        params?.startPage,
        params?.isForward,
      )
      .catch(err => {
        console.error(err);
        return null;
      });
  }

  private async getCategoryPageGroups(params: any): Promise<Array<PageCategoryGroup>> {
    if (!params) {
      console.error(`categories and pageSize are required.`);
      return null;
    }

    return await this.fireArticlesHttpService
      .getLiveShallowArticlesOfCategories(
        params?.categories,
        params?.pageSize
      )
      .catch(err => {
        console.error(err);
        return null;
      });
  }

  // This is the sample pattern to follow to get and serve data.
  // public async getValueForSomeStateKey(params: any) {
  //   if (!params) throw new Error('getValueForSomeStateKey() requires params: param1, param2.');
  //   const { param1, param2 } = params;

  //   const value = await this.someService.getData(param1, param2);

  //   return value;
  // }
}
