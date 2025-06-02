import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerHelloComponent } from './owner-hello.component';

describe('OwnerHelloComponent', () => {
  let component: OwnerHelloComponent;
  let fixture: ComponentFixture<OwnerHelloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerHelloComponent]
    });
    fixture = TestBed.createComponent(OwnerHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
