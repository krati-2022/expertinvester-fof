import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

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
  constructor(private router: Router, private _service: SharedService) { }

  ngOnInit(): void {
    this.getChannel()
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

}
