import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesHomePageComponent } from './components/stories-home-page/stories-home-page.component';
import { StoryPageComponent } from './components/story-page/story-page.component';
import { StoryCategoryPageComponent } from './components/story-category-page/story-category-page.component';


@NgModule({
  declarations: [
  
    StoriesHomePageComponent,
       StoryPageComponent,
       StoryCategoryPageComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule
  ],
  exports: [
  ],
})
export class StoriesModule { }
