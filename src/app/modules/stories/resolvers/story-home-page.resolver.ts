import { ResolveFn } from '@angular/router';

export const storyHomePageResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
