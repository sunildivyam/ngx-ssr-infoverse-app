import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { CategoriesHomePageResolver } from './categories-home-page.resolver';

describe('CategoriesHomePageResolver', () => {
  let resolver: CategoriesHomePageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoriesHomePageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
