import { TestBed } from '@angular/core/testing';

import { AppMetaService } from './app-meta.service';

describe('AppMetaService', () => {
  let service: AppMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
