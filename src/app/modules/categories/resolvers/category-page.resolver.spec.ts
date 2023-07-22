import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { categoryPageResolver } from './category-page.resolver';

describe('categoryPageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => categoryPageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
