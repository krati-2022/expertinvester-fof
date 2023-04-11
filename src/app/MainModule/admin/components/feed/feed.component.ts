import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { FollowClub } from '../club/club.classes';

export interface GetFeedDetails {
  clubName: string;
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
  channelApproved : boolean;
  channelMasterId : string;
  channelRejected : boolean;
  channel_madeby_them : boolean;
  coAdChannel : boolean;
  description : string;
  email : string;
  experttype : string;
  followersCount : number;
  imagename : string;
  imageurl : string;
  isChannelApprove : boolean;
  isChannelLiked : boolean;
  isSubscribed : boolean;
  likecount : number;
  post : number;
  reputation : number;
  mobile_No : string;
  name : string;
  sebi : string;
  subscription : string;
  username : string;
  usertype : string;
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
  public total:number = 0;
  channelDetails: ChannelListDetails[] = []
  clubList: ClubList[] = [];
  followClubDetails = new FollowClub()
  count:any
  constructor(private router: Router, private _service: SharedService) {}

  ngOnInit(): void {
    // this.itemsToDisplay = this.paginate(this.current, this.perPage);
    this.GetFeed();
  }

  GetFeed(){
    let mobile_No = '';
    var splitString = this.mobile_number.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .GetFeed(mobile_No, 0, 10)
      .subscribe((res) => {
        this.feedDetails = res.items;
        // console.log(this.feedDetails);
        
        this.total = Math.ceil(res.totalRecords / this.perPage) - 1
      });
  }
  getChannel(){
    let mobile_No = ''
    var splitString = this.mobile_number.split("")
    if(splitString[0] == '+'){
      splitString[0] ='%2B'
      var joinString = splitString.join("")
      mobile_No = joinString
    }

    this._service.GetChannel(mobile_No).subscribe(res =>{
    this.channelDetails = res.data
    // console.log('this.channelDetails: ', this.channelDetails);
      
    })
  }

  getMasterData() {
    let mobile_No = ''
    var splitString = this.mobile_number.split("")
    if( splitString[0] == '+'){
      splitString[0] = '%2B'
      var joinString =  splitString.join("")
      mobile_No = joinString
    }
    this._service.GetMasterData(mobile_No).subscribe((res) => {
      this.clubList = res.data;
      // console.log('this.clubList : ', this.clubList);
      let data = this.clubList.filter(i => i.follow == 'Followed')
      this.count = data.length
    });
  }

  followClub(clublistId:string){
    this.followClubDetails = new FollowClub({
      clublistId: clublistId,
      mobileno: this.mobile_number
    })
    this._service.FollowClub(this.followClubDetails).subscribe(res =>{
    // console.log('res: ', res);
    this.getMasterData()
    })
  }

  unFollowClub(clublistId: string){
    this.followClubDetails = new FollowClub({
      clublistId: clublistId,
      mobileno: this.mobile_number
    })
    this._service.UnFollowClub(this.followClubDetails).subscribe(res =>{
    // console.log('res: ', res);
    this.getMasterData()
    })
  }
  // public onGoTo(page: number): void {
  //   this.current = page;
  //   this.itemsToDisplay = this.paginate(this.current, this.perPage);
  // }

  // public onNext(page: number): void {
  //   this.current = page + 1;
  //   // console.log('this.current: ', this.current);
  //   this.itemsToDisplay = this.paginate(this.current, this.perPage);
  //   console.log('this.itemsToDisplay: ', this.itemsToDisplay);
    
  // }

  // public onPrevious(page: number): void {
  //   this.current = page - 1;
  //   this.itemsToDisplay = this.paginate(this.current, this.perPage);
  // }

  // public paginate(current: number, perPage: number) {
  //   let mobile_No = '';
  //   var splitString = this.mobile_number.split('');
  //   if (splitString[0] == '+') {
  //     splitString[0] = '%2B';
  //     var joinString = splitString.join('');
  //     mobile_No = joinString;
  //   }
  //   this._service
  //     .GetFeed(mobile_No, current, perPage)
  //     .subscribe((res) => {
  //       this.feedDetails = res.items;
  //       this.total = Math.ceil(res.totalRecords / this.perPage) - 1
  //     });
  //     // console.log('...this.feedDetails: ', ...this.feedDetails);
  //     // console.log('(current - 1) * perPage: ', (current - 1) * perPage);
  //   // return [...this.feedDetails.slice((current - 1) * perPage).slice(0, perPage)];
  // }

  // scrollUp(event:any){
  // console.log('event: ', event);

  // }
  
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


  
}
