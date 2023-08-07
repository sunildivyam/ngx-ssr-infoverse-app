import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesHomePageComponent } from './components/stories-home-page/stories-home-page.component';
import { StoryPageComponent } from './components/story-page/story-page.component';
import { ArticlesSlideshowModule } from '@annuadvent/ngx-cms/articles-slideshow';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { ArticleModule } from '@annuadvent/ngx-cms/article';
import { SlideshowModule } from '@annuadvent/ngx-common-ui/slideshow';
import { ArticleViewModule } from '@annuadvent/ngx-cms/article-view';
import { SocialMediaModule } from '@annuadvent/ngx-common-ui/social-media';


@NgModule({
  declarations: [
    StoriesHomePageComponent,
    StoryPageComponent,
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    ArticlesSlideshowModule,
    CardModule,
    ArticleModule,
    SlideshowModule,
    ArticleViewModule,
    SocialMediaModule,
  ],
  exports: [
    StoriesHomePageComponent,
    StoryPageComponent,
  ],
})
export class StoriesModule { }
