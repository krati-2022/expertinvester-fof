import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Codes } from '../../../../Utils/country-codes';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { EditClub } from './edit-club.classes';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.css'],
})
export class EditClubComponent implements OnInit {
  EditClubForm: FormGroup | any;
  isLoading: boolean = false;
  submitted: boolean = false;
  ClubDetails = new EditClub();
  countryCodes: any;
  id: any;
  model: any = {};
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '5rem',
    translate: 'no',
    rawPaste: false,
    showToolbar: false,
  };
  constructor(
    private location: Location,
    private _service: AdminService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log(Codes);
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.id = params.getAll('id');
    });
    this.countryCodes = Codes;
    // console.log('his.countryCodes: ', this.countryCodes);
    this.EditClubForm = new FormGroup({
      clubName: new FormControl('', Validators.required),
      clubDescription: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
    this.GetClub();
  }

  get EditClubControl() {
    return this.EditClubForm.controls;
  }

  goBack() {
    this.location.back();
  }

  GetClub() {
    this._service.GetClubById(this.id).subscribe((res: any) => {
      this.model.name = res.data[0].name;
      this.model.description = res.data[0].description;
      this.model.country = res.data[0].country;
    });
  }
  submit() {
    this.submitted = true;
    if (this.EditClubForm.invalid) {
      return;
    }
    // console.log(this.id);

    this.ClubDetails = new EditClub({
      id: this.id[0],
      name: this.EditClubForm.value.clubName,
      description: this.EditClubForm.value.clubDescription,
      country: this.EditClubForm.value.country,
    });
    // console.log('this.ClubDetails: ', this.ClubDetails);
    // return
    this.isLoading = true;
    this._service.UpdateClub(this.ClubDetails).subscribe(
      (res) => {
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
          title: 'Club Updated Successfully',
        });
        this.isLoading = false;
        this.router.navigate(['admin/home/club-list']);
      },
      (error) => {
        if (error.status == '400') {
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
            title: 'Something Went Wrong',
          });
          this.isLoading = false;
        }
      }
    );
  }
}
