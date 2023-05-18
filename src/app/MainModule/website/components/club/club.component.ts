import { Component, HostListener, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
import { FollowClub } from './club.classes';
import { Router } from '@angular/router';
import { ChannelListDetails, GetFeedDetails } from '../feed/feed.component';
import Swal from 'sweetalert2';
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
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
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
  isLoading: boolean = false
  constructor(private _service: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.getMasterData();
    // this.GetFeed()
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
    this.isLoading = true
    this._service.GetMasterData(mobile_No).subscribe((res) => {
      this.clubList = res.data;
      // console.log('this.clubList: ', this.clubList);
      // console.log('this.clubList : ', this.clubList);
      let data = this.clubList.filter((i) => i.follow == 'Followed');
      this.count = data.length;
       this.isLoading = false;
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





  open() {
    (<any>$('#filter')).modal('show');
  }
  close() {
    (<any>$('#filter')).modal('hide');
  }

  @HostListener('window:scroll', [])
  public onScrolled() {
    if (window.pageYOffset >= 100) {
      this._service.showSearchBar.emit();
    }
  }
}
