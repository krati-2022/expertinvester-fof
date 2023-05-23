import { Component, HostListener, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
import { Router } from '@angular/router';
import { GetFeedDetails } from '../feed/feed.component';
import { FollowClub } from '../club/club.classes';
import {
  ChannelApproveReject,
  ChannelSubscriber,

} from '../channel/channel.classes';
import { ChannelListDetails } from '../channel/channel.component';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChannelDATA, DATA } from '../feed/feed.classes';
declare var $: any;
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
  apiUrl = environment.baseUrlForWebsite;
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
  screenWidth: any;
  ideaTracker = ['Target', 'Stop Loss'];
  isLoading: boolean = false;
  channelPostId: any;
  activeTab: string = 'home-tab';
  Club: string = '';
  Channel: string = '';
  Expert: string = '';
  Investor: string = '';
  ExpertAndInvestor: string = '';
  FreeAccess: string = '';
  PaidAccess: string = '';
  filterForm: FormGroup | any;
  data: any;
  channeldata: any;
  isShare: boolean = false;
  shareId: any;
  constructor(
    private _service: SharedService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.data = DATA;
    this.channeldata = ChannelDATA;
    this.getWindowSize();
    this._service.search.subscribe((val: any) => {
      this.searchKey = val;
    });

    this.filterForm = new FormGroup({
      name: new FormControl(false),
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getWindowSize();
  }

  getWindowSize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1440) {
      this.getMasterData();
      this.GetFeed();
    }
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
    this.isLoading = true;
    this._service.GetMasterData(mobile_No).subscribe((res) => {
      this.clubList = res.data;
      this.isLoading = false;
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
    this.isLoading = true;
    this._service
      .GetFeed(mobile_No, this.current, this.perPage)
      .subscribe((res) => {
        this.feedDetails = res.items;
        this.isLoading = false;
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
    this.isLoading = true;
    this._service
      .GetChannel(mobile_No, this.current, this.perPage)
      .subscribe((res) => {
        // console.log('res: ', res);
        this.channelDetails = res.items;
        this.isLoading = false;
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
    console.log('this.activeTab: ', this.activeTab);
    if (this.activeTab == 'home-tab') {
      var pageNumber = ++this.current;
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
    // console.log('pageNumber: ', pageNumber);
    // this.GetFeed()
  }

  onScrollChannelList() {
    if (this.activeTab == 'contact-tab') {
      // console.log('pageNumber: ', pageNumber);
      // this.GetFeed()
      var pageNumber = ++this.current;
      let mobile_No = '';
      var splitString = this.mobileNumber.split('');
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
      } else {
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

  getDetails(item: any) {
    // console.log('items: ', item);
    // return
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
    // console.log('clublistId: ', clublistId);
    // this.router.navigate(['home/add-trade/' + clublistId + '/' + this.mobileNumber + '/' + clubName])
    this.router.navigate([
      'home/club-details/' +
        item.id +
        '/' +
        this.mobileNumber +
        '/' +
        item.name,
    ]);
  }

  getFeedDetails(id: string, recordType: string) {
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

  channelLike(channelId: string, status: boolean) {
    let formData = {
      channelId: channelId,
      like: status,
      mobileno: this.mobileNumber,
    };

    this._service.ChannelPostLikeDislike(formData).subscribe((res) => {
      // console.log('res: ', res);
      this.getChannel();
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

  Edit(item: any) {
    this.router.navigate(['home/edit-channel/' + item.channelMasterId]);
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
      mobile_No: this.mobileNumber,
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
  }

  ClearAll() {
    // console.log(this.data);
    this.data.map((i: any) => {
      i.checked = false;
    });
    (<any>$('#filter')).modal('hide');
    if (this.activeTab == 'home-tab') {
      this.GetFeed();
    } else if (this.activeTab == 'contact-tab') {
      this.getChannel();
    }
  }

  share(id: any) {
    this.shareId = id;
    this.isShare = !this.isShare;
  }
}
