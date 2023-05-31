import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChannelComponent } from './my-channel.component';

describe('MyChannelComponent', () => {
  let component: MyChannelComponent;
  let fixture: ComponentFixture<MyChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
