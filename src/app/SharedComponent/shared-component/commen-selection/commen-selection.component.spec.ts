import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenSelectionComponent } from './commen-selection.component';

describe('CommenSelectionComponent', () => {
  let component: CommenSelectionComponent;
  let fixture: ComponentFixture<CommenSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommenSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommenSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
