import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAnnouncementsComponent } from './owner-announcements.component';

describe('OwnerAnnouncementsComponent', () => {
  let component: OwnerAnnouncementsComponent;
  let fixture: ComponentFixture<OwnerAnnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAnnouncementsComponent]
    });
    fixture = TestBed.createComponent(OwnerAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
