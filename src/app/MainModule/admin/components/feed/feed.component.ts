import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

export interface GetFeedDetails {
  clubName: string;
  clublistId: string;
  description: string;
  email: string;
  entryprice: string;
  experttype: string;
  externallink: string;
  id: string;
  imagename: string;
  imageurl: string;
  interval: string;
  isUserLiked: boolean;
  isstoploss: boolean;
  istargetprice: boolean;
  likeCount: number;
  mobile_No: string;
  recordType: string;
  sebi: string;
  stockname: string;
  stoploss: string;
  targetprice: string;
  tradetype: string;
  username: string;
  usertype: string;
}
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  mobile_number = localStorage.getItem('mobile_number') || '{}';
  feedDetails: GetFeedDetails[] = [];
  public current = 0;
  public itemsToDisplay: any;
  public perPage = 10;
  public total:number = 0;
  constructor(private router: Router, private _service: SharedService) {}

  ngOnInit(): void {
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
    // this.GetFeed();
  }

  public onGoTo(page: number): void {
    this.current = page;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
  }

  public onNext(page: number): void {
    this.current = page + 1;
    // console.log('this.current: ', this.current);
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
    console.log('this.itemsToDisplay: ', this.itemsToDisplay);
    
  }

  public onPrevious(page: number): void {
    this.current = page - 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
  }

  public paginate(current: number, perPage: number) {
    let mobile_No = '';
    var splitString = this.mobile_number.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .GetFeed(mobile_No, current, perPage)
      .subscribe((res) => {
        this.feedDetails = res.items;
        this.total = Math.ceil(res.totalRecords / this.perPage) - 1
      });
      // console.log('...this.feedDetails: ', ...this.feedDetails);
      // console.log('(current - 1) * perPage: ', (current - 1) * perPage);
    // return [...this.feedDetails.slice((current - 1) * perPage).slice(0, perPage)];
  }

  
  AddChannel() {
    this.router.navigate(['home/add-channel']);
  }
}
