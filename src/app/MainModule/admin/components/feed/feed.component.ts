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
  activePage:number = 0
  totalRecord = 0
  recoardsPerPage = 10
  feedDetails: GetFeedDetails[] = [];
  constructor(private router: Router, private _service: SharedService) {}

  ngOnInit(): void {
    // this.GetFeed();
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    let mobile_No = ''
    var splitString = this.mobile_number.split("")
    if( splitString[0] == '+'){
      splitString[0] = '%2B'
      var joinString =  splitString.join("")
      mobile_No = joinString
    }
    this._service.GetFeed(mobile_No, this.activePage, this.recoardsPerPage).subscribe((res: any)=> {
      this.feedDetails = res.items
      // console.log('this.feedDetails: ', this.feedDetails);
      this.totalRecord = res.totalRecords
    });
  }
  // GetFeed() {
  //   this._service.GetFeed(this.mobile_number, this.activePage, this.recoardsPerPage).subscribe((res: any)=> {
  //     // console.log('res: ', res);
  //     this.feedDetails = res.items
  //     this.totalRecord = res.totalRecords
  //     console.log('this.feedDetails: ', this.feedDetails);
  //   });
  // }

  AddChannel() {
    this.router.navigate(['home/add-channel']);
  }
  goToListGroup(){
    this.router.navigate(['home/listGroup'])
  }

}
