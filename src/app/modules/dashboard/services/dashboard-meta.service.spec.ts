import { TestBed } from '@angular/core/testing';

import { DashboardMetaService } from './dashboard-meta.service';

describe('DashboardMetaService', () => {
  let service: DashboardMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
