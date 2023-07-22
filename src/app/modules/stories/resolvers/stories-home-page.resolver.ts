import { ResolveFn } from '@angular/router';

export const storiesHomePageResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
