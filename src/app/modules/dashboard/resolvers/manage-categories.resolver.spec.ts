import { TestBed } from '@angular/core/testing';

import { ManageCategoriesResolver } from './manage-categories.resolver';

describe('ManageCategoriesResolver', () => {
  let resolver: ManageCategoriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ManageCategoriesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
