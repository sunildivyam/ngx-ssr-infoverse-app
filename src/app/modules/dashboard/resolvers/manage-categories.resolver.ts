import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageCategories } from '@annuadvent/ngx-tools/fire-cms';
import { CategoriesDataService } from '../services/categories-data.service';



@Injectable({
  providedIn: 'root'
})
export class ManageCategoriesResolver {
  constructor(private categoriesDataService: CategoriesDataService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PageCategories> {
    // if child route is active, then no need to fetch categories
    if (route.firstChild) {
      return null;
    }

    return this.categoriesDataService.getMyCategories();
  }
}
