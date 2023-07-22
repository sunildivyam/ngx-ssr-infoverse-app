import { Routes } from '@angular/router';
import { StoriesHomePageComponent } from '../components/stories-home-page/stories-home-page.component';
import { StoryPageComponent } from '../components/story-page/story-page.component';

export const routes: Routes = [
    {
        path: '',
        component: StoriesHomePageComponent,
        runGuardsAndResolvers: 'always',
    },
    {
        path: ':articleId',
        component: StoryPageComponent,
        runGuardsAndResolvers: 'always',
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
