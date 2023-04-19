import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { ClubList, GetFeedDetails } from '../feed/feed.component';
import { FollowClub } from '../club/club.classes';
import { ChannelApproveReject, ChannelSubscriber } from './channel.classes';

export interface ChannelListDetails {
  channelApproved: boolean;
  channelMasterId: string;
  channelRejected: boolean;
  channel_madeby_them: boolean;
  coAdChannel: boolean;
  description: string;
  email: string;
  experttype: string;
  followersCount: number;
  imagename: string;
  imageurl: string;
  isChannelApprove: boolean;
  isChannelLiked: boolean;
  isSubscribed: boolean;
  likecount: number;
  post: number;
  reputation: number;
  mobile_No: string;
  name: string;
  sebi: string;
  subscription: string;
  username: string;
  usertype: string;
  expertId: string;
}
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {
  mobileNumber = localStorage.getItem('mobile_number') || '';
  channelDetails: ChannelListDetails[] = [];
  clubList: ClubList[] = [];
  feedDetails: GetFeedDetails[] = [];
  followClubDetails = new FollowClub();
  channelSubscriber = new ChannelSubscriber();
  approveRejectDetail = new ChannelApproveReject()
  count: any;
  public current = 0;
  public itemsToDisplay: any;
  public perPage = 10;
  searchKey: string = '';
  constructor(private router: Router, private _service: SharedService) {}

  ngOnInit(): void {
    this.getChannel();
    this._service.search.subscribe((val: any) => {
      this.searchKey = val;
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
      this.channelDetails = res.data;
      // console.log('this.channelDetails: ', this.channelDetails);
    });
  }

  AddChannel() {
    this.router.navigate(['home/add-channel']);
  }
  goToListGroup() {
    this.router.navigate(['home/listGroup']);
  }

  getChannelDetails(item: any) {
    // console.log(item);
    this.router.navigate([
      'home/channel-details/' +
        item.channelMasterId +
        '/' +
        item.mobile_No +
        '/' +
        item.username,
    ]);
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

  subscribe(item: any) {
    // console.log('item: ', item);
    this.channelSubscriber = new ChannelSubscriber({
      channelId: item.channelMasterId,
      subscriber: !item.isSubscribed,
      mobile_No: this.mobileNumber,
    });
    // console.log('this.channelSubscriber: ', this.channelSubscriber);
    // return
    this._service.ChannelSubscribe(this.channelSubscriber).subscribe((res) => {
      // console.log('res: ', res);
      this.getChannel();
    });
  }

  approveRejectChannel(channelMasterId: string, expertId: string, approve: boolean, reject:boolean) {
  
  this.approveRejectDetail = new ChannelApproveReject({
    channelMasterId: channelMasterId,
    expertId: expertId,
    approve: approve,
    reject: reject,
  });
  // console.log(' this.approveRejectDetail: ',  this.approveRejectDetail);
    this._service.ApproveRejectChannel(this.approveRejectDetail).subscribe(res => {
    console.log('res: ', res);
      this.getChannel();
    })
  }
}
