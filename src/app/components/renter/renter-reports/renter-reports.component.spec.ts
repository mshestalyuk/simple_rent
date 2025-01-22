import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterReportsComponent } from './renter-reports.component';

describe('RenterReportsComponent', () => {
  let component: RenterReportsComponent;
  let fixture: ComponentFixture<RenterReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenterReportsComponent]
    });
    fixture = TestBed.createComponent(RenterReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
