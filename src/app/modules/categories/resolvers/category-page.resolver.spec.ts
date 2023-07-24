import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { CategoryPageResolver } from './category-page.resolver';

describe('CategoryPageResolver', () => {
  let resolver: CategoryPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoryPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
