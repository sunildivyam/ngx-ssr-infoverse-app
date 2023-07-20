import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageArticles } from '@annuadvent/ngx-tools/fire-cms';
import { ArticlesDataService } from '../services/articles-data.service';



@Injectable({
  providedIn: 'root'
})
export class ManageStoriesResolver {
  constructor(private articlesDataService: ArticlesDataService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PageArticles> {

    return this.articlesDataService.getMyArticles();
  }
}
