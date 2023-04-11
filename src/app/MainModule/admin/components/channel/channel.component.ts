import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { ClubList, GetFeedDetails } from '../feed/feed.component';
import { FollowClub } from '../club/club.classes';

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
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  mobileNumber = localStorage.getItem('mobile_number') || ''
  channelDetails: ChannelListDetails[] = []
  clubList: ClubList[] = [];
  feedDetails: GetFeedDetails[] = [];
  followClubDetails = new FollowClub()

  count:any
  public current = 0;
  public itemsToDisplay: any;
  public perPage = 10;
  constructor(private router: Router, private _service: SharedService) { }

  ngOnInit(): void {
    this.getChannel()
    this.GetFeed()
  }

  getChannel(){
    let mobile_No = ''
    var splitString = this.mobileNumber.split("")
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
  
  AddChannel(){
    this.router.navigate(['home/add-channel'])
  }
  goToListGroup(){
    this.router.navigate(['home/listGroup'])
  }

  getChannelDetails(item:any){
    // console.log(item);
    this.router.navigate(['home/channel-details/' + item.channelMasterId + '/' + item.mobile_No])
  }

  getMasterData() {
    let mobile_No = ''
    var splitString = this.mobileNumber.split("")
    // console.log('this.mobileNumber: ', this.mobileNumber);
    if( splitString[0] == '+'){
      splitString[0] = '%2B'
      var joinString =  splitString.join("")
      mobile_No = joinString
    }
    this._service.GetMasterData(mobile_No).subscribe((res) => {
      this.clubList = res.data;
      // console.log('this.clubList: ', this.clubList);
      // console.log('this.clubList : ', this.clubList);
      let data = this.clubList.filter(i => i.follow == 'Followed')
      this.count = data.length
    });
  }

  GetFeed(){
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service
      .GetFeed(mobile_No, this.current, this.perPage)
      .subscribe((res) => {
        this.feedDetails = res.items;
        // console.log('this.feedDetails: ', this.feedDetails);
        // console.log(this.feedDetails);
        
        // this.total = Math.ceil(res.totalRecords / this.perPage) - 1
      });
  }
 

  followClub(clublistId:string){
    this.followClubDetails = new FollowClub({
      clublistId: clublistId,
      mobileno: this.mobileNumber
    })
    this._service.FollowClub(this.followClubDetails).subscribe(res =>{
    // console.log('res: ', res);
    this.getMasterData()
    })
  }

  unFollowClub(clublistId: string){
    this.followClubDetails = new FollowClub({
      clublistId: clublistId,
      mobileno: this.mobileNumber
    })
    this._service.UnFollowClub(this.followClubDetails).subscribe(res =>{
    // console.log('res: ', res);
    this.getMasterData()
    })
  }

  onScroll(){
    var pageNumber = ++this.current;
    // console.log('pageNumber: ', pageNumber);
    // this.GetFeed()
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

  getDetails(clublistId:string){
  // console.log('clublistId: ', clublistId);
    this.router.navigate(['home/add-trade/' + clublistId + '/' + this.mobileNumber])
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
