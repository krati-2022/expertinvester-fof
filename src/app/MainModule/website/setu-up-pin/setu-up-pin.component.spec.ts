import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetuUpPinComponent } from './setu-up-pin.component';

describe('SetuUpPinComponent', () => {
  let component: SetuUpPinComponent;
  let fixture: ComponentFixture<SetuUpPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetuUpPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetuUpPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
