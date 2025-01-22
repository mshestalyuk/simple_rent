import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterHelloComponent } from './renter-hello.component';

describe('RenterHelloComponent', () => {
  let component: RenterHelloComponent;
  let fixture: ComponentFixture<RenterHelloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenterHelloComponent]
    });
    fixture = TestBed.createComponent(RenterHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
