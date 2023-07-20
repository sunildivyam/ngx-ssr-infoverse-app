import { Injectable } from '@angular/core';
import { CategoryFeatures } from '@annuadvent/ngx-cms/category';
import { FIREBASE_AUTH_ROLES, FireAuthService } from '@annuadvent/ngx-tools/fire-auth';
import { Article, FireArticlesHttpService, PageArticles, PageCategoryGroup } from '@annuadvent/ngx-tools/fire-cms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesDataService {
  private myArticles$: BehaviorSubject<PageArticles> = new BehaviorSubject<PageArticles>(null);
  private _helpArticles: Array<Article> = null;


  private userName: string = '';

  constructor(
    private fireArticlesHttpService: FireArticlesHttpService,
    private fireAuthService: FireAuthService,
  ) {
    this.userName = this.fireAuthService.getCurrentUserId();
  }

  public get myArticles(): Observable<PageArticles> {
    return this.myArticles$.asObservable();
  }

  /**
   * Returns all published/unpublished shallow articles.
   * @returns PageArticles
   */
  public async getMyArticles(force: boolean = false): Promise<PageArticles> {

    const userName = this.fireAuthService.getCurrentUserId();
    if (userName === this.userName && !force && this.myArticles$.value) {
      return this.myArticles$.value;
    }

    this.userName = this.fireAuthService.getCurrentUserId();
    const isAdmin = await this.fireAuthService.currentUserHasRole(FIREBASE_AUTH_ROLES.ADMIN);
    let myArts: PageArticles = null;
    if (isAdmin) {
      myArts = await this.fireArticlesHttpService.getAllUsersOnePageShallowArticles(null);
    } else {
      myArts = await this.fireArticlesHttpService.getUsersOnePageShallowArticles(this.fireAuthService.getCurrentUserId(), null);
    }

    this.myArticles$.next(myArts);

    return myArts;
  }

  public async getHelpDocs(force: boolean = false): Promise<Array<Article>> {
    if (!force && this._helpArticles) {
      return this._helpArticles;
    }

    const pageCategoryGroups: Array<PageCategoryGroup> =
      await this.fireArticlesHttpService.getLiveShallowArticlesOfCategories([
        CategoryFeatures.helpDocs,
      ]);

    const pageCategoryGroup: PageCategoryGroup = (pageCategoryGroups && pageCategoryGroups[0]) || null;
    this._helpArticles = pageCategoryGroup?.pageArticles?.articles || [];

    return this._helpArticles;
  }
}
