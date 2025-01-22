import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApartmentManagementComponent } from './owner-apartment-management.component';

describe('OwnerApartmentManagementComponent', () => {
  let component: OwnerApartmentManagementComponent;
  let fixture: ComponentFixture<OwnerApartmentManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerApartmentManagementComponent]
    });
    fixture = TestBed.createComponent(OwnerApartmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
