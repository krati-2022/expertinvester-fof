import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAndInvestorComponent } from './expert-and-investor.component';

describe('ExpertAndInvestorComponent', () => {
  let component: ExpertAndInvestorComponent;
  let fixture: ComponentFixture<ExpertAndInvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertAndInvestorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertAndInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
