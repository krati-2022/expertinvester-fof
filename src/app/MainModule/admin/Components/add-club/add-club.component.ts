import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Codes } from '../../../../Utils/country-codes';
import { AddClub } from './add-club.classes';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css'],
})
export class AddClubComponent implements OnInit {
  AddClubForm: FormGroup | any;
  isLoading: boolean = false;
  submitted:boolean = false
  ClubDetails = new AddClub()
  countryCodes: any
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '5rem',
    translate: 'no',
    rawPaste: false,
    showToolbar: false,
  };
  constructor(private location: Location, private _service: AdminService, private router: Router) {}

  ngOnInit(): void {
    // console.log(Codes);
    this.countryCodes = Codes
    // console.log('his.countryCodes: ', this.countryCodes);
    this.AddClubForm = new FormGroup({
      clubName: new FormControl('', Validators.required),
      clubDescription: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  get AddClubControl () { return this.AddClubForm.controls; }

  goBack() {
    this.location.back();
  }
  submit() {
    this.submitted = true
    if(this.AddClubForm.invalid){
      return
    }
    this.ClubDetails = new AddClub({
      clubName: this.AddClubForm.value.clubName,
      clubDescription: this.AddClubForm.value.clubDescription,
      country: this.AddClubForm.value.country,
    });
    console.log('this.ClubDetails: ', this.ClubDetails);
    this.isLoading = true
    this._service.AddClub(this.ClubDetails).subscribe(res => {
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
         icon: 'error',
         title: 'Club Added Successfully',
       });
       this.isLoading = false
       this.router.navigate(['club-list'])
    })
  }
}
