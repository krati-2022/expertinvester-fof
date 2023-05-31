import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingChannelComponent } from './trending-channel.component';

describe('TrendingChannelComponent', () => {
  let component: TrendingChannelComponent;
  let fixture: ComponentFixture<TrendingChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
