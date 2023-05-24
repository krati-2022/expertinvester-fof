import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/Service/shared.service';
import { UpdateProfileDetails } from './profile-page.classe';
import { Codes } from 'src/app/Utils/country-codes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;
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
  updateImageForm: FormGroup | any;
  updateSocialLinkForm: FormGroup | any;
  countryCodes = Codes;
  userDetails = new UpdateProfileDetails();
  imageSrc?: string;
  socialLinks: any;
  twitter: boolean = true;
  facebook: boolean = true;
  insta: boolean = true;
  linkededIn: boolean = true;
  socialmedialinkData: any = [];
  constructor(
    private location: Location,
    private _service: SharedService,
    private router: Router
  ) {}

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
      this.model.image = this.data.image;
      this.model.twitterUrl = this.data.twitterUrl;
      this.model.linkedinUrl = this.data.linkedinUrl;
      this.model.instagramUrl = this.data.instagramUrl;
      this.model.faceBookUrl = this.data.faceBookUrl;
      // console.log('this.model.image: ', this.model.image);
    });
    this.updateUserDetailsForm = new FormGroup({
      mobileno: new FormControl(''),
      name: new FormControl(''),
      aboutus: new FormControl(''),
      email: new FormControl(''),
      code: new FormControl(''),
      instagramUrl: new FormControl(''),
      faceBookUrl: new FormControl(''),
      twitterUrl: new FormControl(''),
      linkedinUrl: new FormControl(''),
    });
    this.updateImageForm = new FormGroup({
      Image: new FormControl(''),
    });
    this.updateSocialLinkForm = new FormGroup({
      url: new FormControl(''),
    });
    this.getSocialLinks();
  }
  goBack() {
    this.location.back();
  }

  getSocialLinks() {
    this._service.GetSocialLinks().subscribe((res: any) => {
      // console.log('res: ', res);
      this.socialLinks = res.data;
      this.socialLinks.map((item: any) => {
        switch (item.name) {
          case 'Twitter':
            this.model.twitter = item;
            break;
          case 'FaceBook':
            this.model.facebook = item;
            break;
          case 'LinkedIn':
            this.model.linkededIn = item;
            break;
          case 'Instagram':
            this.model.Instagram = item;
            break;
        }
      });
      //       console.log('this.model.facebook: ', this.model.facebook);
      //     console.log('this.model.linkededIn: ', this.model.linkededIn);
      //   console.log('this.model.Instagram: ', this.model.Instagram);
      // console.log('this.model.twitter: ', this.model.twitter);
      // console.log('this.socialLinks: ', this.socialLinks[0]);
      // this.model.twitter = this.socialLinks[0].url
    });
  }

  OnChangeField(event:any){
  console.log('event: ', event.target.id);
  this.socialmedialinkData.push({ id: '', name: event.target.id, url:event.target.value });
  // console.log('this.socialmedialinkData: ', this.socialmedialinkData);
  }
  update() {
    this.userDetails = new UpdateProfileDetails({
      mobileno: this.updateUserDetailsForm.value.mobileno,
      name: this.updateUserDetailsForm.value.name,
      aboutus: this.updateUserDetailsForm.value.aboutus,
      email: this.updateUserDetailsForm.value.email,
      instagramUrl: this.updateUserDetailsForm.value.instagramUrl,
      faceBookUrl: this.updateUserDetailsForm.value.faceBookUrl,
      twitterUrl: this.updateUserDetailsForm.value.twitterUrl,
      linkedinUrl: this.updateUserDetailsForm.value.linkedinUrl,
    });
    // console.log('this.userDetails: ', this.userDetails);
    // return
    this._service.UpdateUserDetails(this.userDetails).subscribe((res: any) => {
      console.log('res: ', res);
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
        title: res.message,
      });
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['home/profile-page']);
      });
    });
  }

  openSocialLinks(data: any) {
    <any>$('#socialLinkModel').modal('show');
    // console.log('data: ', data);
    this.model.linkName = data.name;
    this.model.url = data.url;
    this.model.id = data.id;
    // console.log('this.model.url: ', this.model.url);
  }
  closeSocialLinks() {
    <any>$('#socialLinkModel').modal('hide');
  }

  onSelectFile(event: any) {
    // console.log('event: ', event);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.updateImageForm.patchValue({
          image: reader.result,
        });
      };
      let formData = new FormData();
      formData.append('image', file);
      formData.append('Mobile_Number', this.mobileNumber);
      this._service.UpdateUserProfileImage(formData).subscribe((res) => {
        // console.log(res);
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
          title: 'profile picture updated',
        });
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['home/profile-page']);
          });
      });
    }
  }

  UpdateLinks(id: any) {
    let data = {
      id: id,
      name: this.model.linkName,
      mobile_Number: this.mobileNumber,
      url: this.updateSocialLinkForm.value.url,
    };
    this._service.UpDateSocilaLinks(data).subscribe((res: any) => {
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
        title: res.message,
      });
      <any>$('#socialLinkModel').modal('hide');
    });
  }

  EnableDisable(event: any) {
    // console.log('event: ', event.target.id);
    switch (event.target.id) {
      case 'Twitter':
        this.twitter = !this.twitter;
        if (this.twitter == false) {
          this.model.twitterObj = { id: '', name: 'Twitter', url: '' };
        } else if (this.twitter == true) {
          this.model.Obj = { id: '', name: '', url: '' };
        }
        break;
      case 'Facebook':
        this.facebook = !this.facebook;
        if (this.facebook == false) {
          this.model.facebookObj = { id: '', name: 'Facebook', url: '' };
        } else if (this.facebook == true) {
          this.model.Obj = { id: '', name: '', url: '' };
        }
        break;
      case 'Instagram':
        this.insta = !this.insta;
        if (this.insta == false) {
          this.model.instaObj = { id: '', name: 'Instagram', url: '' };
        } else if (this.insta == true) {
          this.model.Obj = { id: '', name: '', url: '' };
        }
        break;
      case 'Linkedin':
        this.linkededIn = !this.linkededIn;
        if (this.linkededIn == false) {
          this.model.linkededInObj = { id: '', name: 'Linkedin', url: '' };
        } else if (this.linkededIn == true) {
          this.model.Obj = { id: '', name: '', url: '' };
        }
        break;
    }
  }
}
