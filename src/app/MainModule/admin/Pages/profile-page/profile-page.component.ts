import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  mobileNumber = localStorage.getItem('mobile_number') || '';
  model: any = {};
  data: any;
  constructor(private location: Location, private _service: SharedService) {}

  ngOnInit(): void {
    // this.getUserDetails();
    this._service.getData().subscribe((data) => {
    // console.log('data: ', data);
      this.data = data
      this.model.aboutUs = this.data.aboutUs;
      this.model.name = this.data.name;
      this.model.email = this.data.email;
      this.model.mobileno = this.data.mobileno;
      this.model.expertType = this.data.expertType;
      this.model.userType = this.data.userType;
    });
  }

 

  goBack() {
    this.location.back();
  }
}
