import { Routes } from '@angular/router';
import { IsLoggedInGuard, RoleAdminGuard } from '@annuadvent/ngx-tools/fire-auth';
import { ManageCategoriesPageComponent } from '../components/manage-categories-page/manage-categories-page.component';
import { ManageCategoryPageComponent } from '../components/manage-category-page/manage-category-page.component';
import { DashboardHomeComponent } from '../components/dashboard-home/dashboard-home.component';
import { ManageStoryPageComponent } from '../components/manage-story-page/manage-story-page.component';
import { ManageStoriesPageComponent } from '../components/manage-stories-page/manage-stories-page.component';
import { ManageCategoriesResolver } from '../resolvers/manage-categories.resolver';
import { ManageStoriesResolver } from '../resolvers/manage-stories.resolver';

export const routes: Routes = [
    {
        path: '',
        component: DashboardHomeComponent,
    },
    {
        path: 'manage-categories',
        component: ManageCategoriesPageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [RoleAdminGuard],
        resolve: { 'manageCategories': ManageCategoriesResolver },
    },
    {
        path: 'manage-categories/:categoryId',
        component: ManageCategoryPageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [RoleAdminGuard]
    },
    {
        path: 'manage-stories',
        component: ManageStoriesPageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [RoleAdminGuard],
        resolve: { 'manageStories': ManageStoriesResolver },
    },
    {
        path: 'manage-stories/:articleId',
        component: ManageStoryPageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [RoleAdminGuard]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
