import { Routes } from '@angular/router';
import {
    ContactUsComponent,
    AboutUsComponent,
    PrivacyComponent,
    TermsAndConditionsComponent,
    AppHomeComponent,
} from '../modules/app-core';
import { IsLoggedInGuard } from '@annuadvent/ngx-tools/fire-auth';

export const routes: Routes = [
    {
        path: '',
        component: AppHomeComponent,
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
    },
    {
        path: 'contact-us',
        component: ContactUsComponent,
    },
    {
        path: 'tnc/terms-and-conditions',
        component: TermsAndConditionsComponent,
    },
    {
        path: 'tnc/privacy-policy',
        component: PrivacyComponent,
    },
    {
        path: 'dashboard',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [IsLoggedInGuard],
        canActivateChild: [IsLoggedInGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'genre',
        loadChildren: () => import('../modules/categories/categories.module').then(m => m.CategoriesModule),
    },
    {
        path: 'stories',
        loadChildren: () => import('../modules/stories/stories.module').then(m => m.StoriesModule),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
