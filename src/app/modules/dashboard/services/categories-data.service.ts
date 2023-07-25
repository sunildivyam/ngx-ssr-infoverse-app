import { Injectable } from '@angular/core';
import { FIREBASE_AUTH_ROLES, FireAuthService } from '@annuadvent/ngx-tools/fire-auth';
import { FireCategoriesHttpService, PageCategories } from '@annuadvent/ngx-tools/fire-cms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataService {
  private myCategories$: BehaviorSubject<PageCategories> = new BehaviorSubject<PageCategories>(null);
  private userName: string = '';

  constructor(
    private fireCategoriesHttpService: FireCategoriesHttpService,
    private fireAuthService: FireAuthService,
  ) {
    this.userName = this.fireAuthService.getCurrentUserId();
  }

  public get myCategories(): Observable<PageCategories> {
    return this.myCategories$.asObservable();
  }

  /**
   * Returns all published/unpublished shallow categories.
   * @returns PageCategories
   */
  public async getMyCategories(force: boolean = false): Promise<PageCategories> {

    const userName = this.fireAuthService.getCurrentUserId();
    if (userName === this.userName && !force && this.myCategories$.value) {
      return this.myCategories$.value;
    }

    this.userName = this.fireAuthService.getCurrentUserId();
    const isAdmin = await this.fireAuthService.currentUserHasRole(FIREBASE_AUTH_ROLES.ADMIN);
    let myCats: PageCategories = null;
    if (isAdmin) {
      myCats = await this.fireCategoriesHttpService.getAllUsersOnePageShallowCategories(null);
    } else {
      myCats = await this.fireCategoriesHttpService.getUsersOnePageShallowCategories(this.fireAuthService.getCurrentUserId(), null);
    }

    this.myCategories$.next(myCats);

    return myCats;
  }
}
