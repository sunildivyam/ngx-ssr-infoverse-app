import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { AppHomePageResolver } from './app-home-page.resolver';

describe('AppHomePageResolver', () => {
  let resolver: AppHomePageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AppHomePageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
