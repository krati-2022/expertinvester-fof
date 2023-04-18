import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-club-list',
  templateUrl: './feed-club-list.component.html',
  styleUrls: ['./feed-club-list.component.css'],
})
export class FeedClubListComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
