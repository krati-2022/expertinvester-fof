import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/Service/shared.service';
import { UpdateProfileDetails } from './profile-page.classe';
import { Codes } from 'src/app/Utils/country-codes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  mobileNumber = localStorage.getItem('mobile_number') || '';
  model: any = {};
  data: any;
  updateUserDetailsForm: FormGroup | any;
  countryCodes = Codes;
  userDetails = new UpdateProfileDetails();
  constructor(private location: Location, private _service: SharedService, private router: Router) {}

  ngOnInit(): void {
    // this.getUserDetails();
    this._service.getData().subscribe((data) => {
      // console.log('data: ', data);
      this.data = data;
      this.model.aboutUs = this.data.aboutUs;
      this.model.name = this.data.name;
      this.model.email = this.data.email;
      this.model.mobileno = this.data.mobileno;
      this.model.expertType = this.data.expertType;
      this.model.userType = this.data.userType;
    });
    this.updateUserDetailsForm = new FormGroup({
      mobileno: new FormControl(''),
      name: new FormControl(''),
      aboutus: new FormControl(''),
      email: new FormControl(''),
      code: new FormControl(''),
    });
  }
  goBack() {
    this.location.back();
  }

  update() {
    this.userDetails = new UpdateProfileDetails({
      mobileno: this.updateUserDetailsForm.value.mobileno,
      name: this.updateUserDetailsForm.value.name,
      aboutus: this.updateUserDetailsForm.value.aboutus,
      email: this.updateUserDetailsForm.value.email,
    });
    // console.log('this.userDetails: ', this.userDetails);
    this._service.UpdateUserDetails(this.userDetails).subscribe((res:any) =>{
    // console.log('res: ', res);
       const Toast = Swal.mixin({
         toast: true,
         position: 'top-end',
         showConfirmButton: false,
         timer: 3000,
         timerProgressBar: true,
         didOpen: (toast) => {
           toast.addEventListener('mouseenter', Swal.stopTimer);
           toast.addEventListener('mouseleave', Swal.resumeTimer);
         },
       });
       Toast.fire({
         icon: 'success',
         title: res.message
       });
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
        this.router.navigate(['home/profile-page']);
       })
    })
  }
}
