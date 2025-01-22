import { TestBed } from '@angular/core/testing';

import { ApartmentTenantService } from './apartment-tenant.service';

describe('ApartmentTenantService', () => {
  let service: ApartmentTenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentTenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
