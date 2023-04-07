import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
import { FollowClub } from './club.classes';
import { Router } from '@angular/router';

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
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  mobileNumber = localStorage.getItem('mobile_number') || '{}';
  clubList: ClubList[] = [];
  followClubDetails = new FollowClub()
  count:any
  constructor(private _service: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.getMasterData();
  }

  getMasterData() {
    let mobile_No = ''
    var splitString = this.mobileNumber.split("")
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

 
  AddChannel(){
    this.router.navigate(['home/add-channel'])
  }
}
