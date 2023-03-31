import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';
import { ExpertManagementDetails } from './expert.classes';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css'],
})
export class ExpertComponent implements OnInit {
  AddExpertForm: FormGroup | any;
  submitted: boolean = false;
  submitPhone: boolean = false;
  ExpertDetails = new ExpertManagementDetails();
  country:Array<any> = []
  usertype = sessionStorage.getItem('usertype');
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private coreHelperService: CoreHelperService,
    private _service: SharedService
  ) {}

  ngOnInit(): void {
    this.AddExpertForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          this.coreHelperService.getNameValidation(),
        ]),
      ],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      mobileno: [
        '',
        Validators.compose([Validators.maxLength(20), Validators.required]),
      ],
      usertype: [this.usertype, Validators.required],
      aboutus: ['', Validators.required],
      experttype: ['', Validators.required],
      IsSEBI: [true, Validators.required],
      SEBIRegNo: ['', Validators.required],
      certificateURL: [''],
      experience: ['', Validators.required],
      knowledgelevel: ['', Validators.required],
      accountname: ['', Validators.required],
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required],
      bankIFSCcode: ['', Validators.required],
    });
    this._service.GetCountry().subscribe(response =>{
      this.country = response.data
      // console.log('this.country: ', this.country);
    })
  }

  get ExpertControl() {
    return this.AddExpertForm.controls;
  }

  omit_special_char(event: any) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  // goToHomePage() {
  //   this.router.navigate(['home/expertList']);
  // }

  onSubmit() {
    this.submitted = true;
    this.submitPhone = true;
    if (this.AddExpertForm.invalid) {
      return;
    }
   
    this.ExpertDetails = this.AddExpertForm.getRawValue() as ExpertManagementDetails;
    // console.log('this.ExpertDetails: ', this.ExpertDetails);
    // return
    this._service.AddExpert(this.ExpertDetails).subscribe((response) => {
      // console.log('response: ', response);
      this.AddExpertForm.reset()
      this.submitted = false
      this.submitPhone = false
      sessionStorage.removeItem('usertype')
      this.router.navigate(['home/expertList']);
    },
    (error)=>{
      if(error.status == '400'){
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
          title: 'Something went wrong please try again',
        });
      }
    }
    );
  }
}
