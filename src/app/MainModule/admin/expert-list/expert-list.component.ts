import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

export interface ExpertList {
      id: string,
      mobileno: string,
      name: string,
      userType: string,
      aboutUs: string,
      email: string,
      expertType: string,
      isSEBI: boolean,
      sebiRegNo: string,
      certificateURL: string,
      certificatefilename: string,
      experience: string,
      knowledgeLevel: string,
      accountname: string,
      accountnumber: string,
      bankname: string,
      bankIFSCcode: string,
      followersCount: number,
      likecount: number,
      post: number,
      reputation: number
}
@Component({
  selector: 'app-expert-list',
  templateUrl: './expert-list.component.html',
  styleUrls: ['./expert-list.component.css']
})
export class ExpertListComponent implements OnInit {
  mobileNumber = localStorage.getItem('mobile_number') || ''
  expertList : ExpertList[] = []
  coAdList:any = []
  myForm: FormGroup | any
  constructor(private router: Router, private _service: SharedService) { }

  ngOnInit(): void {
    this.getExpertList()
    this.myForm = new FormGroup({
      adOn : new FormControl(false)
    })
  }

  getExpertList(){
    let mobile_number = ''
    var splitString = this.mobileNumber.split("")
    if(splitString[0] == '+'){
      splitString[0] = '%2B'
      var joinString = splitString.join("")
      mobile_number = joinString
    }
    this._service.GetExpertList(mobile_number).subscribe(res =>{
    this.expertList = res.data
    // console.log('this.expertList: ', this.expertList[0]);
      
    })
  }
  goToExpertProfilePage(id:string){
    // console.log(this.myForm.value.adOn);
    if(this.myForm.value.adOn){
      this.coAdList.push({expertId: id})
    }else{
      this.coAdList.filter((i:any)=> i.expertId == id).forEach((x:any) => this.coAdList.splice(this.coAdList.indexOf(x), 1))
    }
    // console.log('this.coAdList: ', this.coAdList);
  
  }

  submit(){
    localStorage.setItem('coAddOn', JSON.stringify(this.coAdList))
    this.router.navigate(['home/add-channel'])
  }
}
