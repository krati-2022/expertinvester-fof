import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { ClubList, GetFeedDetails } from '../feed/feed.component';
import { FollowClub } from '../club/club.classes';
import { ChannelApproveReject, ChannelSubscriber } from './channel.classes';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
declare var $: any;

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
  isUserChannel: boolean;
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
  apiUrl = environment.apiUrl;
  channelDetails: ChannelListDetails[] = [];
  clubList: ClubList[] = [];
  feedDetails: GetFeedDetails[] = [];
  followClubDetails = new FollowClub();
  channelSubscriber = new ChannelSubscriber();
  approveRejectDetail = new ChannelApproveReject();
  PaidAccess: string = '';
  FreeAccess: string = '';
  Expert: string = '';
  Investor: string = '';
  ExpertAndInvestor: string = '';
  count: any;
  public current = 0;
  public itemsToDisplay: any;
  public perPage = 10;
  searchKey: string = '';
  filterForm: FormGroup | any;
  data = [
    'Expert',
    'Investor',
    'Expert&Invester',
    'Free Access',
    'Paid Access',
  ];
  constructor(
    private router: Router,
    private _service: SharedService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getChannel();
    this._service.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.filterForm = new FormGroup({
      name: new FormControl(false),
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
    this.router.navigate([
      'home/channel-details/' +
        item.channelMasterId +
        '/' +
        item.mobile_No +
        '/' +
        item.name + '/' + item.isUserChannel
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
    this._service
      .ApproveRejectChannel(this.approveRejectDetail)
      .subscribe((res) => {
        // console.log('res: ', res);
        this.getChannel();
      });
  }

  Edit(item: any) {
    this.router.navigate(['home/edit-channel/' + item.channelMasterId]);
  }
  open() {
    (<any>$('#filter')).modal('show');
  }
  close() {
    (<any>$('#filter')).modal('hide');
  }

  onFilter(event: any) {
    // console.log('event: ', event);
    //   console.log(this.filterForm.value.name);
    switch (event) {
      case 'Free Access':
        this.FreeAccess =
          this.filterForm.value.name == true ? 'FreeAccess' : '';
        break;
      case 'Paid Access':
        this.PaidAccess =
          this.filterForm.value.name == true ? 'PaidAccess' : '';
        break;
      case 'Expert':
        this.Expert = this.filterForm.value.name == true ? 'Expert' : '';
        break;
      case 'Investor':
        this.Investor = this.filterForm.value.name == true ? 'Investor' : '';
        break;
      case 'Expert&Invester':
        this.ExpertAndInvestor =
          this.filterForm.value.name == true ? 'ExpertAndInvestor' : '';
        break;
    }
  }

  apply() {
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    (<any>$('#filter')).modal('hide');
    this.http
      .get(
        this.apiUrl +
          'api/Filter/GetChannelMasterFilterList?Mobile_No=' +
          mobile_No +
          '&FreeAccess=' +
          this.FreeAccess +
          '&PaidAccess=' +
          this.PaidAccess +
          '&Expert=' +
          this.Expert +
          '&Investor=' +
          this.Investor +
          '&ExpertAndInvestor=' +
          this.ExpertAndInvestor +
          'pageNumber=0&pageSize=100'
      )
      .subscribe({
        next: (response: any) => {
          // debugger;
          this.channelDetails = response.items;
        },
        error: (error) => {
          if (error.status == '400') {
          }
        },
      });
  }

  @HostListener('window:scroll', [])
  public onScrolled() {
    if (window.pageYOffset >= 100) {
      this._service.showSearchBar.emit();
    }
  }
}
