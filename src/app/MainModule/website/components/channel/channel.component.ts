import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { ClubList, GetFeedDetails } from '../feed/feed.component';
import { FollowClub } from '../club/club.classes';
import { ChannelApproveReject, ChannelSubscriber, DATA } from './channel.classes';
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
  apiUrl = environment.baseUrlForWebsite;
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
  screenWidth: any;
  public current = 0;
  public itemsToDisplay: any;
  public perPage = 10;
  searchKey: string = '';
  filterForm: FormGroup | any;
  data = DATA;
  isLoading: boolean = false;
  isLike: boolean = false;
  isShare: boolean = false;
  shareId: any;
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
    if (this.isLike == false) {
      this.isLoading = true;
    }
    this._service
      .GetChannel(mobile_No, this.current, this.perPage)
      .subscribe((res) => {
        // console.log('res: ', res);
        this.channelDetails = res.items;
        this.isLoading = false;
        // console.log('this.channelDetails: ', this.channelDetails);
      });
  }

  onScroll() {
    this.screenWidth = window.innerWidth;
    // console.log('this.screenWidth: ', this.screenWidth);
    if (this.screenWidth >= 992) {
      var pageNumber = ++this.current;
      let mobile_No = '';
      var splitString = this.mobileNumber.split('');
      if (splitString[0] == '+') {
        splitString[0] = '%2B';
        var joinString = splitString.join('');
        mobile_No = joinString;
      }
  
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
        item.name +
        '/' +
        item.isUserChannel +
        '/' +
        item.isSubscribed,
    ]);
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
    (<any>$('#filterPopUp')).modal('show');
  }
  close() {
    (<any>$('#filterPopUp')).modal('hide');
  }

  onFilter(event: any) {
    // console.log('event: ', event);
    //   console.log(this.filterForm.value.name);
    event.status = true;
    switch (event.name) {
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
    (<any>$('#filterPopUp')).modal('hide');
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

  like(channelId: string, status: boolean) {
    let formData = {
      channelId: channelId,
      like: status,
      mobileno: this.mobileNumber,
    };
    this.isLike = true;
    this._service.ChannelPostLikeDislike(formData).subscribe((res) => {
      // console.log('res: ', res);
      this.getChannel();
      // this.getLikes(id)
    });
  }
  ClearAll() {
    this.data.map((i: any) => {
      i.checked = false;
    });
    (<any>$('#filterPopUp')).modal('hide');
    this.getChannel();
  }

  share(id: any) {
    this.shareId = id;
    this.isShare = !this.isShare;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.getWindowSize();
  // }

  // getWindowSize() {
  //   this.screenWidth = window.innerWidth;
  //   console.log('this.screenWidth: ', this.screenWidth);
  // }

  @HostListener('window:scroll', [])
  public onScrolled() {
    if (window.pageYOffset >= 100) {
      this._service.showSearchBar.emit();
    }
  }
}
