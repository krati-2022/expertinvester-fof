import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedClubListComponent } from './feed-club-list.component';

describe('FeedClubListComponent', () => {
  let component: FeedClubListComponent;
  let fixture: ComponentFixture<FeedClubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedClubListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
