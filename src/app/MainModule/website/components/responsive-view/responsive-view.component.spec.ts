import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveViewComponent } from './responsive-view.component';

describe('ResponsiveViewComponent', () => {
  let component: ResponsiveViewComponent;
  let fixture: ComponentFixture<ResponsiveViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsiveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
