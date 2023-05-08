import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ChannelSubscriber } from '../channel/channel.classes';
declare var $: any;
export interface PostDetails {
  id: string;
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
  isUserChannel: string;
  likecount: number;
  post: number;
  reputation: number;
  mobile_No: string;
  channelname: string;
  sebi: string;
  subscription: string;
  isSubscribe: boolean;
  username: string;
  usertype: string;
  stockname: string;
  entryprice: string;
  stoploss: string;
  targetprice: string;
  externallink: string;
  createdate: string;
  benefits: any;
  idealfor: any;
}

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.css'],
})
export class ChannelDetailsComponent implements OnInit {
  id: any;
  mobile_No: any;
  usersMobileNumber: any = localStorage.getItem('mobile_number');
  username: any;
  channelPostId: any;
  activePostDetails: PostDetails[] = [];
  pastPostDetails: PostDetails[] = [];
  profile: PostDetails[] = [];
  notFound: any = '';
  activeTab: any = 'Active-Post';
  isUserChannel: any;
  ideaTracker = ['Target', 'Stop Loss'];
  channelSubscriber = new ChannelSubscriber();
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _service: SharedService,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.paramMap.get('param1');
    this.mobile_No = this._ActivatedRoute.snapshot.paramMap.get('param2');
    this.username = this._ActivatedRoute.snapshot.paramMap.get('param3');
    this.isUserChannel = this._ActivatedRoute.snapshot.paramMap.get('param4');
    // console.log('this.username: ', this.username);
    this.getActivePost();
    // if (this.isSubscribed == 'true') {
    // }else if(this.isSubscribed == 'false'){
    //   this.GetPastPost()
    //   this.activeTab = 'Past-Post';
    // }
    // Pusher.logToConsole = true;
    // const pusher = new Pusher('523e3cf86c481c43e5a5', {
    //   cluster: 'ap2',
    // });
    // const channel = pusher.subscribe('channel');
    // channel.bind('my-event', (data: any) => {
    //   // alert(JSON.stringify(data));
    //   this.messages.push(data);
    //   console.log(' this.messages: ', this.messages);
    // });
  }

  goBack() {
    this.location.back();
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

      // this.isUserChannel = this.activePostDetails[0].isUserChannel;
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
      this.notFound = res.message;
      this.pastPostDetails = res.data;
      // console.log('this.channelDetails: ', this.channelDetails);
    });
  }

  GetProfile() {
    let mobile_No = '';
    var splitString = this.usersMobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    console.log('mobile_No: ', mobile_No);

    this._service.GetProfile(mobile_No, this.id).subscribe((res) => {
      this.profile = res.data;
      // console.log('this.channelDetails: ', this.channelDetails);
    });
  }
  getTab(event: any) {
    // console.log('event: ', event.target.id);
    this.activeTab = event.target.id;
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
        // this.GetPastPost();
        break;
      default:
        // this.isSubscribed == 'true' ? this.getActivePost() : this.GetPastPost();
        this.getActivePost();
    }
  }

  addPost() {
    this.router.navigate([
      'home/list/' + this.id + '/' + this.mobile_No + '/' + this.username,
    ]);
  }

  jumoToChannel() {
    this.router.navigate(['home/channel']);
  }

  open(id: any) {
    this.channelPostId = id;
    <any>$('#exampleModalCenter').modal('show');
  }

  close() {
    <any>$('#exampleModalCenter').modal('hide');
  }

  onChange(event: any) {
    let istargetprice;
    let isstoploss;
    switch (event.target.id) {
      case 'Target':
        istargetprice = true;
        isstoploss = false;
        break;
      case 'Stop Loss':
        istargetprice = false;
        isstoploss = true;
        break;
    }
    let formData = {
      channelPostId: this.channelPostId,
      mobile_No: this.usersMobileNumber,
      istargetprice: istargetprice,
      isstoploss: isstoploss,
    };
    this._service.IdeaTracker(formData).subscribe((res) => {
      // console.log('res: ', res);
      this.getActivePost();
      <any>$('#exampleModalCenter').modal('hide');
    });
  }

  subscribe(item:any) {
  console.log('item: ', item);
  // return
    this.channelSubscriber = new ChannelSubscriber({
      channelId: item.channelId,
      subscriber: !item.isSubscribe,
      mobile_No: this.usersMobileNumber,
    });
    // console.log('this.channelSubscriber: ', this.channelSubscriber);
    // return
    
    this._service.ChannelSubscribe(this.channelSubscriber).subscribe((res) => {
    console.log('res: ', res);
      this.GetProfile()
    });
  }
}
