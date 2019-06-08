import { TestBed } from '@angular/core/testing';

import { AzureDataService } from './azure-data.service';

describe('AzureDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AzureDataService = TestBed.get(AzureDataService);
    expect(service).toBeTruthy();
  });
});
