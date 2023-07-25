import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesHomePageComponent } from './components/categories-home-page/categories-home-page.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { ArticleModule } from '@annuadvent/ngx-cms/article';
import { CategoryModule } from '@annuadvent/ngx-cms/category';
import { CategoryArticlesListModule } from '@annuadvent/ngx-cms/category-articles-list';
import { CardModule } from '@annuadvent/ngx-common-ui/card';


@NgModule({
  declarations: [
    CategoriesHomePageComponent,
    CategoryPageComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CategoryModule,
    ArticleModule,
    CategoryArticlesListModule,
    CardModule,
  ],
  exports: [
    CategoriesHomePageComponent,
    CategoryPageComponent
  ],
})
export class CategoriesModule { }
