import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { StoriesHomePageResolver } from './stories-home-page.resolver';

describe('StoriesHomePageResolver', () => {
  let resolver: StoriesHomePageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StoriesHomePageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
