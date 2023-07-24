import { Routes } from '@angular/router';
import { StoriesHomePageComponent } from '../components/stories-home-page/stories-home-page.component';
import { StoryPageComponent } from '../components/story-page/story-page.component';
import { StoriesHomePageResolver } from '../resolvers/stories-home-page.resolver';
import { StoryPageResolver } from '../resolvers/story-page.resolver';

export const routes: Routes = [
    {
        path: '',
        component: StoriesHomePageComponent,
        runGuardsAndResolvers: 'always',
        resolve: { 'storiesHomePage': StoriesHomePageResolver },
        children: [
            {
                path: ':articleId',
                component: StoryPageComponent,
                runGuardsAndResolvers: 'always',
                resolve: { 'storyPage': StoryPageResolver },
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
