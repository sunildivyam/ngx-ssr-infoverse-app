import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesHomePageComponent } from './components/stories-home-page/stories-home-page.component';
import { StoryPageComponent } from './components/story-page/story-page.component';


@NgModule({
  declarations: [
    StoriesHomePageComponent,
    StoryPageComponent,
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule
  ],
  exports: [
    StoriesHomePageComponent,
    StoryPageComponent,
  ],
})
export class StoriesModule { }
