import { TestBed } from '@angular/core/testing';

import { StoriesMetaService } from './stories-meta.service';

describe('StoriesMetaService', () => {
  let service: StoriesMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoriesMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
