import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { storiesHomePageResolver } from './stories-home-page.resolver';

describe('storiesHomePageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => storiesHomePageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
