import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.css'],
})
export class EnterPinComponent implements OnInit {
  pin = localStorage.getItem('pin');
  isExist = localStorage.getItem('isExist')
  password!: string;
  showOtpComponent = true;
  mobile_No = localStorage.getItem('mobile_No')
  message!: string
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };
  constructor(private router: Router, private _service: SharedService) {}

  ngOnInit(): void {
    // if(this.mobile_No == null){
    //   this.router.navigate([''])
    // }
  }

  onOtpChange(otp: string) {
    this.password = otp;
    // console.log('this.password : ', this.password );
    // console.log(this.pin);

    // console.log('this.password: ', this.password.length);
    if (this.password === this.pin) {
      // console.log('this.isExist: ', this.isExist);
      if(this.isExist){
        this.router.navigate(['home'])
      }else{
        this.router.navigate(['user-set-up']);
      }
    }else if(this.password != this.pin && this.password.length == 4){
      this.message = 'Incorrect Pin'
    }
    // console.log('this.otp: ', this.otp);
  }
  onClick() {
    this.config.isPasswordInput = !this.config.isPasswordInput;
  }

  forgotPin(){
    this.router.navigate(['set-up-pin'])
  }
}
