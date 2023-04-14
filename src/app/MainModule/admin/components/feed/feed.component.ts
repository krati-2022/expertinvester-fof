import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { FollowClub } from '../club/club.classes';

export interface GetFeedDetails {
  clubName: string;
  clubBlock: boolean
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
  clubBlock: boolean
}

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
  public total: number = 0;
  channelDetails: ChannelListDetails[] = [];
  clubList: ClubList[] = [];
  followClubDetails = new FollowClub();
  count: any;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  searchKey: string = '';
  
  constructor(private router: Router, private _service: SharedService) {}

  ngOnInit(): void {
    // this.itemsToDisplay = this.paginate(this.current, this.perPage);
    this.GetFeed();
    this._service.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  GetFeed() {
    let mobile_No = '';
    var splitString = this.mobile_number.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .GetFeed(mobile_No, this.current, this.perPage)
      .subscribe((res) => {
        console.log('res: ', res.items);
        this.feedDetails = res.items;
        // console.log('this.feedDetails: ', this.feedDetails);
        // console.log(this.feedDetails);

        // this.total = Math.ceil(res.totalRecords / this.perPage) - 1
      });
  }
  getChannel() {
    let mobile_No = '';
    var splitString = this.mobile_number.split('');
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

  getMasterData() {
    let mobile_No = '';
    var splitString = this.mobile_number.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service.GetMasterData(mobile_No).subscribe((res) => {
      this.clubList = res.data;
      // console.log('this.clubList : ', this.clubList);
      let data = this.clubList.filter((i) => i.follow == 'Followed');
      this.count = data.length;
    });
  }

  getLikes(id:any){
    this._service.GetLikes(id).subscribe(res =>{
      console.log(res);
      
    })
  }

  followClub(clublistId: string) {
    this.followClubDetails = new FollowClub({
      clublistId: clublistId,
      mobileno: this.mobile_number,
    });
    this._service.FollowClub(this.followClubDetails).subscribe((res) => {
      // console.log('res: ', res);
      this.getMasterData();
    });
  }

  unFollowClub(clublistId: string) {
    this.followClubDetails = new FollowClub({
      clublistId: clublistId,
      mobileno: this.mobile_number,
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
    var splitString = this.mobile_number.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .GetFeed(mobile_No, pageNumber, this.perPage)
      .subscribe((res) => {
      // console.log('res: ', res.items);
        if(res.items.length != 0){
          this.feedDetails.push(...res.items);
        }else {
          this.current--
        }
        
        // this.total = Math.ceil(res.totalRecords / this.perPage) - 1
      });
  }

  AddChannel() {
    this.router.navigate(['home/add-channel']);
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

  getDetails(id: string, recordType: string) {
    // console.log('recordType: ', recordType);
    // console.log('id: ', id);
    // return
    switch (recordType) {
      case 'ClubRecord':
        this.router.navigate(['home/details/' + id + '/' + this.mobile_number]);
        break;
      case 'ChannelRecord':
        this.router.navigate([
          'home/listGroup/' + id + '/' + this.mobile_number,
        ]);
        break;
    }
  }

  getClubDetails(clublistId:string, clubName:string){
    // console.log('clublistId: ', clublistId);
      this.router.navigate(['home/add-trade/' + clublistId + '/' + this.mobile_number + '/' + clubName])
    }

  blockUnblockPost(id: string, status: boolean) {
    // console.log('status: ', status);
    // console.log('id: ', id);
    let mobile_No = '';
    var splitString = this.mobile_number.split('');
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
  like(id:string, status:boolean){
    let mobile_No = '';
    var splitString = this.mobile_number.split('');
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


}
