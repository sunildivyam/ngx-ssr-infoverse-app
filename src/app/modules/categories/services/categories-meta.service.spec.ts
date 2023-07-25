import { TestBed } from '@angular/core/testing';

import { CategoriesMetaService } from './categories-meta.service';

describe('CategoriesMetaService', () => {
  let service: CategoriesMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
