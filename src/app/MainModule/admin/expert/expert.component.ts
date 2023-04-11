import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';
import { ExpertManagementDetails } from './expert.classes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css'],
})
export class ExpertComponent implements OnInit {
  apiUrl = environment.apiUrl
  AddExpertForm: FormGroup | any;
  formData = new FormData();
  submitted: boolean = false;
  submitPhone: boolean = false;
  imageSrc: string = '';
  ExpertDetails = new ExpertManagementDetails();
  country: Array<any> = [];
  file: File[] | any;
  url: any;
  experience = ['1 Year', '2 Year', '3 Year', '4 Year', '5 Year']
  knowledgeLevel = ['Beginner', 'Intermediate', 'Professional']
  ismobileNumberExist = localStorage.getItem('mobile_number')
  usertype = sessionStorage.getItem('usertype');
  isLoading:boolean = false
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private coreHelperService: CoreHelperService,
    private _service: SharedService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // console.log('this.ismobileNumberExist: ', this.ismobileNumberExist);
    if(!this.ismobileNumberExist){
      this.router.navigate([''])
     }
    this.AddExpertForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          this.coreHelperService.getNameValidation(),
        ]),
      ],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      mobileno: [this.ismobileNumberExist, Validators.required],
      usertype: [this.usertype, Validators.required],
      aboutus: ['', Validators.required],
      experttype: ['', Validators.required],
      IsSEBI: ['', Validators.required],
      SEBIRegNo: [''],
      certificateURL: [null],
      experience: ['', Validators.required],
      knowledgelevel: ['', Validators.required],
      accountname: ['', Validators.required],
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required],
      bankIFSCcode: ['', Validators.required],
    });
    this._service.GetCountry().subscribe((response) => {
      this.country = response.data;
      // console.log('this.country: ', this.country);
    });
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

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.imageSrc = event.target.files[0].name
    this.AddExpertForm.patchValue({
      certificateURL: file,
    });
    this.AddExpertForm.get('certificateURL').updateValueAndValidity();
  }

  onSubmit() {
    this.submitted = true;
    this.submitPhone = true;
    if (this.AddExpertForm.invalid) {
      return;
    }
    
    var formData: any = new FormData();
    formData.append('name', this.AddExpertForm.get('name').value);
    formData.append('email', this.AddExpertForm.get('email').value);
    formData.append('mobileno', this.AddExpertForm.get('mobileno').value);
    formData.append('usertype', this.AddExpertForm.get('usertype').value);
    formData.append('aboutus', this.AddExpertForm.get('aboutus').value);
    formData.append('experttype', this.AddExpertForm.get('experttype').value);
    formData.append('IsSEBI', this.AddExpertForm.get('IsSEBI').value);
    formData.append('SEBIRegNo', this.AddExpertForm.get('SEBIRegNo').value);
    formData.append('experience', this.AddExpertForm.get('experience').value);
    formData.append(
      'knowledgelevel',
      this.AddExpertForm.get('knowledgelevel').value
    );
    formData.append('accountname', this.AddExpertForm.get('accountname').value);
    formData.append(
      'accountnumber',
      this.AddExpertForm.get('accountnumber').value
    );
    formData.append('bankname', this.AddExpertForm.get('bankname').value);
    formData.append(
      'bankIFSCcode',
      this.AddExpertForm.get('bankIFSCcode').value
      );
      formData.append(
        'certificateURL',
        this.AddExpertForm.get('certificateURL').value
        );
        // console.log('formData: ', formData);
        this.isLoading = true
        // return
        this.http
        // .post('https://api.expertinvester.com/api/ExpertInvestor/AddExpert', formData)
        .post(this.apiUrl + 'api/ExpertInvestor/AddExpert', formData)
        .subscribe({
        next: (response) => {
          console.log('response: ', response);
          // debugger;
          this.AddExpertForm.reset();
          this.submitted = false;
          this.submitPhone = false;
          sessionStorage.removeItem('usertype');
          this.router.navigate(['club-list']);
          this.isLoading = false
        },
        error: (error) => {
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
              icon: 'success',
              title: 'Something went wrong please try again',
            });
            this.isLoading = false
          }
        },
      });
  }
}
