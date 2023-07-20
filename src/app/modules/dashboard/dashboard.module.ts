import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { MetaModule } from '@annuadvent/ngx-common-ui/meta';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { ManageCategoryPageComponent } from './components/manage-category-page/manage-category-page.component';
import { ManageCategoriesPageComponent } from './components/manage-categories-page/manage-categories-page.component';
import { ManageStoriesPageComponent } from './components/manage-stories-page/manage-stories-page.component';
import { ManageStoryPageComponent } from './components/manage-story-page/manage-story-page.component';
import { ArticleModule } from '@annuadvent/ngx-cms/article';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';
import { SearchBoxModule } from '@annuadvent/ngx-common-ui/search-box';
import { CategoryModule } from '@annuadvent/ngx-cms/category';
import { CategoryEditorModule } from '@annuadvent/ngx-cms/category-editor';
import { ArticleEditorModule } from '@annuadvent/ngx-cms/article-editor';
import { ArticleListModule } from '@annuadvent/ngx-cms/article-list';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { ModalModule } from '@annuadvent/ngx-common-ui/modal';
import { ToggleModule } from '@annuadvent/ngx-common-ui/toggle';
import { MultiSelectBoxModule } from '@annuadvent/ngx-common-ui/multi-select-box';
import { CollapsibleModule } from '@annuadvent/ngx-common-ui/collapsible';
import { OpenaiAutoArticlesModule } from '@annuadvent/ngx-cms/openai-auto-articles';
import { FiltersModule } from '@annuadvent/ngx-common-ui/filters';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    ManageCategoryPageComponent,
    ManageCategoriesPageComponent,
    ManageStoriesPageComponent,
    ManageStoryPageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    TabsModule,
    CardModule,
    SearchBoxModule,
    CategoryModule,
    CategoryEditorModule,
    ArticleModule,
    ArticleEditorModule,
    ArticleListModule,
    SpinnerModule,
    ModalModule,
    ToggleModule,
    MultiSelectBoxModule,
    CollapsibleModule,
    FiltersModule,
    OpenaiAutoArticlesModule,
    ErrorModule,
  ],
  exports: [
    DashboardHomeComponent,
    ManageCategoryPageComponent,
    ManageCategoriesPageComponent,
    ManageStoriesPageComponent,
    ManageStoryPageComponent,
  ],
  providers: [],
})
export class DashboardModule { }
