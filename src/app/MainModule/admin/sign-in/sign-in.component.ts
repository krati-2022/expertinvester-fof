import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';
import { SendOtp, VerifyOtp } from './sign-in.class';
declare var $ : any 


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  SendOtpForm: FormGroup
  submitted: boolean = false
  SendOtpModel = new SendOtp()
  VerifyOtpModel = new VerifyOtp()
  mobileNumbr: number | undefined
  otp: string = '';
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor(private router: Router, private cookieService: CookieService, private formBuilder: FormBuilder, private _service: SharedService) {
    localStorage.clear()
    let mobileNumber = this.cookieService.get('mobileNumber');
    let mobileNumberValue = '';
    if (mobileNumber != null && mobileNumber != undefined) {
      mobileNumberValue = mobileNumber;
    }

    this.SendOtpForm = this.formBuilder.group({
      mobile_No: [mobileNumber,[Validators.required] ],
    });
   }

  ngOnInit(): void {
  }
  onOtpChange(otp:string) {
    this.otp = otp;
    // console.log('this.otp: ', this.otp);
  }

  keyPressNumbers(event:any) {
    // console.log('event: ', event);
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  get SendOtpFormControl() { return this.SendOtpForm.controls}

  sendOtp(){
    this.submitted = true
    if (this.SendOtpForm.invalid) {
      return;
    }
    this.SendOtpModel = new SendOtp({
      mobile_No : this.SendOtpForm.value.mobile_No
    })
   
    this._service.SendOtp(this.SendOtpModel).subscribe((response) => {
    console.log('response: ', response);
      this.mobileNumbr = this.SendOtpModel.mobile_No;
      if(response.status == 'Success'){
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
          title: response.message,
        });
        this.submitted = false;
        (<any>$('#exampleModal')).modal('show');
      }
    
    });
  }

  verifyOtp(){
    this.submitted = true
    if (this.otp == '') {
      return;
    }
    this.VerifyOtpModel = new VerifyOtp({
      mobileno : this.SendOtpForm.value.mobile_No,
      otp : this.otp
    })
    this._service.VerifyOtp(this.VerifyOtpModel).subscribe((response)=>{
    // console.log('response: ', response);
      if(response.status == 'Success'){
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
          title: response.message,
        });
        (<any>$('#exampleModal')).modal('hide');
        this.router.navigate(['user-set-up'])
      }else if(response.status == 'Failed'){
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
          title: response.message,
        });
      }
    })
  }
}
