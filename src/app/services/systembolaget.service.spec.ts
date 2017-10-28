import { TestBed, inject } from '@angular/core/testing';

import { SystembolagetService } from './systembolaget.service';

describe('SystembolagetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystembolagetService]
    });
  });

  it('should be created', inject([SystembolagetService], (service: SystembolagetService) => {
    expect(service).toBeTruthy();
  }));
});
