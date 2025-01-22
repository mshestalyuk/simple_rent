import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApartmentsComponent } from './owner-apartments.component';

describe('OwnerApartmentsComponent', () => {
  let component: OwnerApartmentsComponent;
  let fixture: ComponentFixture<OwnerApartmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerApartmentsComponent]
    });
    fixture = TestBed.createComponent(OwnerApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
