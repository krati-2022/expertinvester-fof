import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

export interface PostDetails {
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
  channelname: string;
  sebi: string;
  subscription: string;
  username: string;
  usertype: string;
  stockname: string;
  entryprice: string;
  stoploss: string;
  targetprice: string;
  benefits:any
  idealfor:any
}

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.css'],
})
export class ChannelDetailsComponent implements OnInit {
  id: any;
  mobile_No: any;
  activePostDetails: PostDetails[] = [];
  pastPostDetails: PostDetails[] = [];
  profile: PostDetails[] = [];
  notFound: any = '';
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _service: SharedService
  ) {}

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.paramMap.get('param1');
    this.mobile_No = this._ActivatedRoute.snapshot.paramMap.get('param2');
    this.getActivePost();
  }

  getActivePost() {
    let mobile_No = '';
    var splitString = this.mobile_No.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }

    this._service.GetActivePost(mobile_No, this.id).subscribe((res) => {
      this.notFound = res.message;
      this.activePostDetails = res.data;
      // console.log('this.channelDetails: ', this.channelDetails);
    });
  }

  GetPastPost() {
    let mobile_No = '';
    var splitString = this.mobile_No.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }

    this._service.GetPastPost(mobile_No, this.id).subscribe((res) => {
    console.log('res: ', res);
      this.notFound = res.message;
      console.log('this.notFound: ', this.notFound);
      this.pastPostDetails = res.data;
      // console.log('this.channelDetails: ', this.channelDetails);
    });
  }

  GetProfile() {
    let mobile_No = '';
    var splitString = this.mobile_No.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }

    this._service.GetProfile(mobile_No, this.id).subscribe((res) => {
    console.log('res: ', res.data[0]);
      
      this.profile = res.data;
      // console.log('this.channelDetails: ', this.channelDetails);
    });
  }
  getTab(event: any) {
    console.log('event: ', event.target.id);
    switch (event.target.id) {
      case 'Active-Post':
        this.getActivePost();
        break;
      case 'Past-Post':
        this.GetPastPost();
        break;
      case 'Profile':
        this.GetProfile();
        break;
      case 'Chat':
        this.GetPastPost();
        break;
      default:
        this.getActivePost();
    }
  }
}
