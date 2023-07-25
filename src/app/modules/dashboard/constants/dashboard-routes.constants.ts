import { Routes } from '@angular/router';
import { IsLoggedInGuard, RoleAdminGuard, RoleAuthorGuard } from '@annuadvent/ngx-tools/fire-auth';
import { ManageCategoriesPageComponent } from '../components/manage-categories-page/manage-categories-page.component';
import { ManageCategoryPageComponent } from '../components/manage-category-page/manage-category-page.component';
import { DashboardHomeComponent } from '../components/dashboard-home/dashboard-home.component';
import { ManageStoryPageComponent } from '../components/manage-story-page/manage-story-page.component';
import { ManageStoriesPageComponent } from '../components/manage-stories-page/manage-stories-page.component';
import { ManageCategoriesResolver } from '../resolvers/manage-categories.resolver';
import { ManageStoriesResolver } from '../resolvers/manage-stories.resolver';
import { SitemapPageComponent } from '../components/sitemap-page/sitemap-page.component';

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
        children: [
            {
                path: ':categoryId',
                component: ManageCategoryPageComponent,
                runGuardsAndResolvers: 'always',
                canActivate: [RoleAdminGuard]
            }
        ]
    },
    {
        path: 'manage-stories',
        component: ManageStoriesPageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [RoleAuthorGuard],
        resolve: { 'manageStories': ManageStoriesResolver },
        children: [
            {
                path: ':storyId',
                component: ManageStoryPageComponent,
                runGuardsAndResolvers: 'always',
                canActivate: [RoleAuthorGuard]
            },
        ]
    },
    {
        path: 'openai',
        component: ManageCategoryPageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [RoleAdminGuard]
    },
    {
        path: 'manage-sitemap',
        component: SitemapPageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [RoleAdminGuard]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
