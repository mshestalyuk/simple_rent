import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterApartmentComponent } from './renter-apartment.component';

describe('RenterApartmentComponent', () => {
  let component: RenterApartmentComponent;
  let fixture: ComponentFixture<RenterApartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenterApartmentComponent]
    });
    fixture = TestBed.createComponent(RenterApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
