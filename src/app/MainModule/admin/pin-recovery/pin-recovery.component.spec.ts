import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinRecoveryComponent } from './pin-recovery.component';

describe('PinRecoveryComponent', () => {
  let component: PinRecoveryComponent;
  let fixture: ComponentFixture<PinRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinRecoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
