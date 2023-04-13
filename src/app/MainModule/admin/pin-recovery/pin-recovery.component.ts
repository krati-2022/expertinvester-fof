import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';
import {Codes} from '../../../Utils/country-codes'
import { SendOtpForRecoverPin, VerifyOtpForRecovery } from './pin-recovery.classes';

declare var $: any;
export interface PinRecoveryRespose {
  data: {
    mobileNo: string;
    otp: string;
  };
  status: string;
  message: string;
}
@Component({
  selector: 'app-pin-recovery',
  templateUrl: './pin-recovery.component.html',
  styleUrls: ['./pin-recovery.component.css']
})
export class PinRecoveryComponent implements OnInit {
  SendOtpForm: FormGroup;
  submitted: boolean = false;
  SendOtpModel = new SendOtpForRecoverPin();
  VerifyOtpModel = new VerifyOtpForRecovery();
  mobileNumbr!: string ;
  otp: string = '';
  showOtpComponent = true;
  message: string = ''
  status: string = ''
  mobile: string = ''
  isExistUser = localStorage.getItem('mobile_number')
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  isLoading:boolean = false
  countryCodes = Codes 
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };


  constructor(
    private router: Router,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private _service: SharedService
  ) {
    // localStorage.clear();
    let mobileNumber = this.cookieService.get('mobileNumber');
    let mobileNumberValue = '';
    if (mobileNumber != null && mobileNumber != undefined) {
      mobileNumberValue = mobileNumber;
    }

    this.SendOtpForm = this.formBuilder.group({
      mobile_No: [mobileNumber, [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      code: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // console.log(this.countryCodes);
    
    // console.log('this.isExistUser: ', this.isExistUser);
    // if(this.isExistUser != null){
    //   this.router.navigate(['enter-pin'])
    // }
  }
  onOtpChange(otp: string) {
    this.otp = otp;
    // console.log('this.otp: ', this.otp);
  }

  keyPressNumbers(event: any) {
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
  get SendOtpFormControl() {
    return this.SendOtpForm.controls;
  }

  sendOtp() {
    
    this.submitted = true;
    if (this.SendOtpForm.invalid) {
      return;
    }
   
    this.isLoading = true
    this.SendOtpModel = new SendOtpForRecoverPin({
      mobile_No: this.SendOtpForm.value.code + this.SendOtpForm.value.mobile_No,
    });
    var splitString = this.SendOtpModel.mobile_No.split("")
    if( splitString[0] == '+'){
      splitString[0] = '%2B'
      var joinString =  splitString.join("")
      this.mobile = joinString
    }else{
      this.mobile = this.SendOtpModel.mobile_No
    }
    this._service
        .SendOtpForRestPin(this.SendOtpModel)
        .subscribe((response: PinRecoveryRespose) => {
          // console.log('response: ', response);
          if(response.message == 'False'){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: 'error',
              title: 'Number is not valid',
            });
            this.isLoading = false
            return
          }
          this.isLoading = false
          this.mobileNumbr = this.SendOtpModel.mobile_No;
          console.log('this.mobileNumbr: ', response.data.otp);
          if (response.status == 'Success') {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: 'success',
              title: response.message + ' ' +response.data.otp,
            });
            this.submitted = false;
            
            (<any>$('#exampleModal')).modal('show');
          }
        });
    
   
  }

  verifyOtp() {
    this.submitted = true;
    if (this.otp == '') {
      return;
    }
    this.VerifyOtpModel = new VerifyOtpForRecovery({
      mobileno: this.SendOtpForm.value.code + this.SendOtpForm.value.mobile_No,
      otp: this.otp,
    });

    this._service.VerifyRecoverPinOtp(this.VerifyOtpModel).subscribe((response) => {
      // console.log('response: ', response);
      if (response.status == 'Success') {
        localStorage.setItem('mobile_number', response.data[0].mobileno);
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
        this.router.navigate(['set-up-pin'])
      
      } else if (response.status == 'Failed') {
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
    });
  }

  closeModelPopUp() {
    if ((<any>$('#exampleModal')).modal('hide') && this.otp == '') {
      localStorage.removeItem('mobile_number');
    }
    (<any>$('#exampleModal')).modal('hide');
  }
}

