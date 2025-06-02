import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterApartmentManagementComponent } from './renter-apartment-management.component';

describe('RenterApartmentManagementComponent', () => {
  let component: RenterApartmentManagementComponent;
  let fixture: ComponentFixture<RenterApartmentManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenterApartmentManagementComponent]
    });
    fixture = TestBed.createComponent(RenterApartmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
