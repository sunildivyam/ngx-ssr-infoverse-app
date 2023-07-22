import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { categoriesHomePageResolver } from './categories-home-page.resolver';

describe('categoriesHomePageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => categoriesHomePageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
