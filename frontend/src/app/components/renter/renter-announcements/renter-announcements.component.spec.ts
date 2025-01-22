import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterAnnouncementsComponent } from './renter-announcements.component';

describe('RenterAnnouncementsComponent', () => {
  let component: RenterAnnouncementsComponent;
  let fixture: ComponentFixture<RenterAnnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenterAnnouncementsComponent]
    });
    fixture = TestBed.createComponent(RenterAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
