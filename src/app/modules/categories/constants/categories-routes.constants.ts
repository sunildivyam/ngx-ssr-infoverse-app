import { Routes } from '@angular/router';
import { CategoriesHomePageComponent } from '../components/categories-home-page/categories-home-page.component';
import { CategoryPageComponent } from '../components/category-page/category-page.component';
import { CategoryPageResolver } from '../resolvers/category-page.resolver';
import { CategoryHomePageResolver } from '../resolvers/categories-home-page.resolver';

export const routes: Routes = [
    {
        path: '',
        component: CategoriesHomePageComponent,
        runGuardsAndResolvers: 'always',
        resolve: { 'categoryHomePage': CategoryHomePageResolver },
        children: [
            {
                path: ':categoryId',
                component: CategoryPageComponent,
                runGuardsAndResolvers: 'always',
                resolve: { 'categoryPage': CategoryPageResolver }
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
