import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
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
  username: any;
  messages: any = [];
  message: string = '';
  activePostDetails: PostDetails[] = [];
  pastPostDetails: PostDetails[] = [];
  profile: PostDetails[] = [];
  notFound: any = '';
  activeTab: any = 'Active-Post';
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
    // console.log('this.username: ', this.username);
    this.getActivePost();
    Pusher.logToConsole = true;
    const pusher = new Pusher('523e3cf86c481c43e5a5', {
      cluster: 'ap2',
    });
    const channel = pusher.subscribe('channel');
    channel.bind('my-event', (data: any) => {
      // alert(JSON.stringify(data));
      this.messages.push(data);
      console.log(' this.messages: ', this.messages);
    });
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
    var splitString = this.mobile_No.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }

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
        this.GetPastPost();
        break;
      default:
        this.getActivePost();
    }
  }

  addPost() {
    this.router.navigate([
      'home/list/' + this.id + '/' + this.mobile_No + '/' + this.username,
    ]);
  }

  onChnage(event: any) {
    // console.log('event: ', event.target.value);
    this.message = event.target.value;
  }

  submit(): void {
    this.message = '';
    console.log('this.message: ', this.message);
    return;
    this.http
      .post('http://localhost/api/messages', {
        username: this.username,
        message: this.message,
      })
      .subscribe(() => {
        this.message = '';
      });
  }
}
