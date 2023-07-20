import { TestBed } from '@angular/core/testing';

import { ManageStoriesResolver } from './manage-stories.resolver';

describe('ManageStoriesResolver', () => {
  let resolver: ManageStoriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ManageStoriesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
