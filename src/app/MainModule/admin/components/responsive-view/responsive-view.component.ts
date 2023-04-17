import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
import { Router } from '@angular/router';
import {  GetFeedDetails } from '../feed/feed.component';
import { FollowClub } from '../club/club.classes';
import { ChannelApproveReject, ChannelSubscriber } from '../channel/channel.classes';
import { ChannelListDetails } from '../channel/channel.component';

export interface ClubList {
  id: string;
  description: string;
  follow: string;
  followersCount: number;
  likecount: number;
  name: string;
  postcount: number;
 
}
@Component({
  selector: 'app-responsive-view',
  templateUrl: './responsive-view.component.html',
  styleUrls: ['./responsive-view.component.css'],
})
export class ResponsiveViewComponent implements OnInit {
  mobileNumber = localStorage.getItem('mobile_number') || '{}';
  clubList: ClubList[] = [];
  followClubDetails = new FollowClub();
  feedDetails: GetFeedDetails[] = [];
  channelDetails: ChannelListDetails[] = [];
  count: any;
  searchKey: string = '';
  public current = 0;
  public itemsToDisplay: any;
  public perPage = 10;
  approveRejectDetail = new ChannelApproveReject();
  channelSubscriber = new ChannelSubscriber();
  constructor(private _service: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.getMasterData();
    this.GetFeed();
    this._service.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  getMasterData() {
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    // console.log('this.mobileNumber: ', this.mobileNumber);
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service.GetMasterData(mobile_No).subscribe((res) => {
      this.clubList = res.data;
      // console.log('this.clubList: ', this.clubList);
      // console.log('this.clubList : ', this.clubList);
      let data = this.clubList.filter((i) => i.follow == 'Followed');
      this.count = data.length;
    });
  }

  GetFeed() {
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .GetFeed(mobile_No, this.current, this.perPage)
      .subscribe((res) => {
        this.feedDetails = res.items;
        // console.log('this.feedDetails: ', this.feedDetails);
        // console.log(this.feedDetails);

        // this.total = Math.ceil(res.totalRecords / this.perPage) - 1
      });
  }
  getChannel() {
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }

    this._service.GetChannel(mobile_No).subscribe((res) => {
      console.log('res: ', res);
      this.channelDetails = res.data;
      // console.log('this.channelDetails: ', this.channelDetails);
    });
  }

  followClub(clublistId: string) {
    this.followClubDetails = new FollowClub({
      clublistId: clublistId,
      mobileno: this.mobileNumber,
    });
    this._service.FollowClub(this.followClubDetails).subscribe((res) => {
      // console.log('res: ', res);
      this.getMasterData();
    });
  }

  unFollowClub(clublistId: string) {
    this.followClubDetails = new FollowClub({
      clublistId: clublistId,
      mobileno: this.mobileNumber,
    });
    this._service.UnFollowClub(this.followClubDetails).subscribe((res) => {
      // console.log('res: ', res);
      this.getMasterData();
    });
  }

  onScroll() {
    var pageNumber = ++this.current;
    // console.log('pageNumber: ', pageNumber);
    // this.GetFeed()
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .GetFeed(mobile_No, pageNumber, this.perPage)
      .subscribe((res) => {
        this.feedDetails.push(...res.items);

        // this.total = Math.ceil(res.totalRecords / this.perPage) - 1
      });
  }

  AddChannel() {
    this.router.navigate(['home/add-channel']);
  }

  getDetails(clublistId: string, clubName: string) {
    // console.log('clublistId: ', clublistId);
    this.router.navigate([
      'home/add-trade/' + clublistId + '/' + this.mobileNumber + '/' + clubName,
    ]);
  }

  getFeedDetails(id: string, recordType: string) {
    // console.log('recordType: ', recordType);
    // console.log('id: ', id);
    // return
    switch (recordType) {
      case 'ClubRecord':
        this.router.navigate(['home/details/' + id + '/' + this.mobileNumber]);
        break;
      case 'ChannelRecord':
        this.router.navigate([
          'home/listGroup/' + id + '/' + this.mobileNumber,
        ]);
        break;
    }
  }

  getChannelDetails(item: any) {
    // console.log(item);
    this.router.navigate([
      'home/channel-details/' + item.channelMasterId + '/' + item.mobile_No,
    ]);
  }

  getTab(event: any) {
    console.log('event: ', event.target.id);
    switch (event.target.id) {
      case 'home-tab':
        this.GetFeed();
        break;
      case 'profile-tab':
        this.getMasterData();
        break;
      case 'contact-tab':
        this.getChannel();
        break;

      default:
        this.GetFeed();
    }
  }

  blockUnblockPost(id: string, status: boolean) {
    // console.log('status: ', status);
    // console.log('id: ', id);
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .BlockUnblockFeedPost(id, mobile_No, status)
      .subscribe((res) => {
        console.log('res: ', res);
        this.GetFeed();
      });
  }

  like(id: string, status: boolean) {
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .FeedPostLikeDislike(id, status, mobile_No)
      .subscribe((res) => {
        // console.log('res: ', res);
        this.GetFeed();
        // this.getLikes(id)
      });
  }

  subscribe(item: any) {
    // console.log('item: ', item);
    this.channelSubscriber = new ChannelSubscriber({
      channelId: item.channelMasterId,
      subscriber: !item.isSubscribed,
      mobile_No: item.mobile_No,
    });
    // console.log('this.channelSubscriber: ', this.channelSubscriber);
    // return
    this._service.ChannelSubscribe(this.channelSubscriber).subscribe((res) => {
      // console.log('res: ', res);
      this.getChannel();
    });
  }

  approveRejectChannel(
    channelMasterId: string,
    expertId: string,
    approve: boolean,
    reject: boolean
  ) {
    this.approveRejectDetail = new ChannelApproveReject({
      channelMasterId: channelMasterId,
      expertId: expertId,
      approve: approve,
      reject: reject,
    });
    // console.log(' this.approveRejectDetail: ',  this.approveRejectDetail);
    this._service
      .ApproveRejectChannel(this.approveRejectDetail)
      .subscribe((res) => {
        console.log('res: ', res);
        this.getChannel();
      });
  }
}

