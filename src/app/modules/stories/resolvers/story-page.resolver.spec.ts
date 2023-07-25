import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { StoryPageResolver } from './story-page.resolver';

describe('StoryPageResolver', () => {
  let resolver: StoryPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StoryPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
