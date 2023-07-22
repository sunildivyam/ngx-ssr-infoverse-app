import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { storyHomePageResolver } from './story-home-page.resolver';

describe('storyHomePageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => storyHomePageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
