import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { FollowClub } from '../club/club.classes';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChannelDATA, DATA } from './feed.classes';
import Swal from 'sweetalert2';

declare var $: any;
export interface GetFeedDetails {
  clubName: string;
  clubBlock: boolean;
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
  isSelfPost: boolean;
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
  clubBlock: boolean;
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
  clubBlock: boolean;
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
  apiUrl = environment.baseUrlForWebsite;
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
  filterForm: FormGroup | any;
  scrollPosition = 0;
  data = DATA;
  channeldata = ChannelDATA;
  ideaTracker = ['Target', 'Stop Loss'];
  Club: string = '';
  Channel: string = '';
  Expert: string = '';
  Investor: string = '';
  ExpertAndInvestor: string = '';
  FreeAccess: string = '';
  PaidAccess: string = '';
  showSearch: boolean = false;
  isShare: boolean = false;
  shareId: any;
  isLoading: boolean = false;
  isLike: boolean = false;
  channelPostId: any;
  activeTab = 'home-tab';
  constructor(
    private router: Router,
    private _service: SharedService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.itemsToDisplay = this.paginate(this.current, this.perPage);

    this.GetFeed();
    this._service.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.filterForm = new FormGroup({
      name: new FormControl(false),
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
    if (this.isLike == false) {
      this.isLoading = true;
    }
    this._service
      .GetFeed(mobile_No, this.current, this.perPage)
      .subscribe((res) => {
        // console.log('res: ', res.items[0]);
        this.feedDetails = res.items;
        this.isLoading = false;
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
    if (this.isLike == true){
      this.isLoading = false;
    } else{
      this.isLoading = true;
    }
    this._service.GetChannel(mobile_No,this.current, this.perPage).subscribe((res) => {
      this.channelDetails = res.items;
      this.isLoading = false;
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
    this.isLoading = true;
    this._service.GetMasterData(mobile_No).subscribe((res) => {
      this.clubList = res.data;
      // console.log('this.clubList : ', this.clubList);
      let data = this.clubList.filter((i) => i.follow == 'Followed');
      this.count = data.length;
      this.isLoading = false;
    });
  }

  getLikes(id: any) {
    this._service.GetLikes(id).subscribe((res) => {
      console.log(res);
    });
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
    if (this.activeTab == 'home-tab') {
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
      // console.log(this.Channel);
      if (
        this.Club != '' ||
        this.Channel != '' ||
        this.Expert != '' ||
        this.ExpertAndInvestor != '' ||
        this.Investor != ''
      ) {
        this.http
          .get(
            this.apiUrl +
              'api/Filter/GetFeedPostFilter?Mobile_No=' +
              mobile_No +
              '&Club=' +
              this.Club +
              '&Channel=' +
              this.Channel +
              '&Expert=' +
              this.Expert +
              '&Investor=' +
              this.Investor +
              '&ExpertAndInvestor=' +
              this.ExpertAndInvestor +
              '&pageNumber=' +
              pageNumber +
              '&pageSize=' +
              this.perPage
          )
          .subscribe({
            next: (response: any) => {
              if (response.items.length != 0) {
                this.feedDetails.push(...response.items);
              } else {
                this.current--;
              }
            },
            error: (error) => {
              if (error.status == '400') {
              }
            },
          });
      } else {
        this._service
          .GetFeed(mobile_No, pageNumber, this.perPage)
          .subscribe((res) => {
            // console.log('res: ', res.items);
            if (res.items.length != 0) {
              this.feedDetails.push(...res.items);
            } else {
              this.current--;
            }

            // this.total = Math.ceil(res.totalRecords / this.perPage) - 1
          });
      }
    }
  }

  onScrollChannelList(){
     if(this.activeTab=='contact-tab'){
      // console.log('pageNumber: ', pageNumber);
      // this.GetFeed()
      var pageNumber = ++this.current
      let mobile_No = '';
      var splitString = this.mobile_number.split('');
      if (splitString[0] == '+') {
        splitString[0] = '%2B';
        var joinString = splitString.join('');
        mobile_No = joinString;
      }
      // console.log(this.Channel);
      if (
        this.FreeAccess != '' ||
        this.PaidAccess != '' ||
        this.Expert != '' ||
        this.ExpertAndInvestor != '' ||
        this.Investor != ''
      ) {
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
               '&pageNumber=' +
               this.current +
               '&pageSize=' +
               this.perPage
           )
           .subscribe({
             next: (response: any) => {
               if (response.items.length != 0) {
                 this.channelDetails.push(...response.items);
               } else {
                 this.current--;
               }
             },
             error: (error) => {
               if (error.status == '400') {
               }
             },
           });
      }else{
        this._service
          .GetChannel(mobile_No, pageNumber, this.perPage)
          .subscribe((res) => {
            // console.log('res: ', res);
            if (res.items.length != 0) {
              this.channelDetails.push(...res.items);
            } else {
              this.current--;
            }
            // console.log('this.channelDetails: ', this.channelDetails);
          });
      }
    }
  }

  AddChannel() {
    this.router.navigate(['home/add-channel']);
  }

  getTab(event: any) {
    // console.log('event: ', event.target.id);
    switch (event.target.id) {
      case 'home-tab':
        this.activeTab = 'home-tab';
        this.GetFeed();
        break;
      case 'profile-tab':
        this.activeTab = 'profile-tab';
        this.getMasterData();
        break;
      case 'contact-tab':
        this.activeTab = 'contact-tab';
        this.getChannel();
        break;

      default:
        this.GetFeed();
    }
  }

  getDetails(id: string, recordType: string) {
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

  getClubDetails(item: any) {
    if (item.follow == 'Follow') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'error',
        title: 'Follow First',
      });
      return;
    }

    this.router.navigate([
      'home/club-details/' +
        item.id +
        '/' +
        this.mobile_number +
        '/' +
        item.name,
    ]);
  }

  getChannelDetails(item: any) {
    this.router.navigate([
      'home/channel-details/' +
        item.channelMasterId +
        '/' +
        item.mobile_No +
        '/' +
        item.name +
        '/' +
        item.isUserChannel +
        '/' +
        item.isSubscribed,
    ]);
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
        // console.log('res: ', res);
        this.GetFeed();
      });
  }

  like(id: string, status: boolean) {
    let mobile_No = '';
    var splitString = this.mobile_number.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this.isLike = true;
    this._service
      .FeedPostLikeDislike(id, status, mobile_No)
      .subscribe((res) => {
        // console.log('res: ', res);
        this.GetFeed();
        // this.getLikes(id)
      });
  }

  open() {
    (<any>$('#filter')).modal('show');
  }
  close() {
    (<any>$('#filter')).modal('hide');
  }

  openIdeaTracke(id: any) {
    this.channelPostId = id;
    <any>$('#exampleModalCenter').modal('show');
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
      mobile_No: this.mobile_number,
      istargetprice: istargetprice,
      isstoploss: isstoploss,
    };
    this._service.IdeaTracker(formData).subscribe((res) => {
      // console.log('res: ', res);
      this.GetFeed();
      <any>$('#exampleModalCenter').modal('hide');
    });
  }

  closeIdeaTracke() {
    <any>$('#exampleModalCenter').modal('hide');
  }
  onFilter(event: any) {
    event.checked = true;

    switch (event.name) {
      case 'Club':
        this.Club = this.filterForm.value.name == true ? 'Club' : '';
        break;
      case 'Channel':
        this.Channel = this.filterForm.value.name == true ? 'Channel' : '';
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
      case 'Free Access':
        this.FreeAccess =
          this.filterForm.value.name == true ? 'FreeAccess' : '';
        break;
      case 'Paid Access':
        this.PaidAccess =
          this.filterForm.value.name == true ? 'PaidAccess' : '';
        break;
    }
  }

  apply() {
    if (this.activeTab == 'home-tab') {
      let mobile_No = '';
      var splitString = this.mobile_number.split('');
      if (splitString[0] == '+') {
        splitString[0] = '%2B';
        var joinString = splitString.join('');
        mobile_No = joinString;
      }
      (<any>$('#filter')).modal('hide');
      this.http
        .get(
          this.apiUrl +
            'api/Filter/GetFeedPostFilter?Mobile_No=' +
            mobile_No +
            '&Club=' +
            this.Club +
            '&Channel=' +
            this.Channel +
            '&Expert=' +
            this.Expert +
            '&Investor=' +
            this.Investor +
            '&ExpertAndInvestor=' +
            this.ExpertAndInvestor +
            '&pageNumber=' +
            this.current +
            '&pageSize=' +
            this.perPage
        )
        .subscribe({
          next: (response: any) => {
            // debugger;
            this.feedDetails = response.items;
          },
          error: (error) => {
            if (error.status == '400') {
            }
          },
        });
    } else if (this.activeTab == 'contact-tab') {
      let mobile_No = '';
      var splitString = this.mobile_number.split('');
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
            '&pageNumber=' +
            this.current +
            '&pageSize=' +
            this.perPage
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
  }

  ClearAll() {
    // console.log(this.data);
    this.data.map((i: any) => {
      i.checked = false;
    });
    // (<any>$('#filter')).modal('hide');
    if (this.activeTab == 'home-tab') {
      this.GetFeed();
    } else if (this.activeTab == 'contact-tab') {
      this.getChannel();
    }
  }

  channelLike(channelId: string, status: boolean) {
    this.isLike = true
    let formData = {
      channelId: channelId,
      like: status,
      mobileno: this.mobile_number,
    };

    this._service.ChannelPostLikeDislike(formData).subscribe((res) => {
      // console.log('res: ', res);
      this.getChannel();
      // this.getLikes(id)
    });
  }

  share(id: any) {
    this.shareId = id;
    this.isShare = !this.isShare;
  }

  @HostListener('window:scroll', [])
  public onScrolled() {
    if (window.pageYOffset >= 100) {
      this._service.showSearchBar.emit();
    }
  }
}
