import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { Login } from './enter-pin.classes';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.css'],
})
export class EnterPinComponent implements OnInit {
  pin: any = localStorage.getItem('pin');
  isRegistered = localStorage.getItem('isRegistered');
  password!: string;
  showOtpComponent = true;
  loginDetails = new Login();
  mobile_No: any = localStorage.getItem('mobile_number');
  message!: string;
  mobile: string = '';

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
    // console.log('this.mobile_No: ', this.mobile_No);
    if (this.mobile_No == null) {
      this.router.navigate(['']);
    }
    var splitString = this.mobile_No.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      this.mobile = joinString;
    } else {
      this.mobile = this.mobile_No;
    }
    if (this.pin == null) {
      this._service.GetPin(this.mobile).subscribe((res) => {
        this.pin = res.data;
      });
    }
    if (this.mobile_No == undefined) {
      this.router.navigate(['']);
    }
  }

  onOtpChange(pin: string) {
    this.password = pin;
    if (this.password === this.pin) {
      if (this.isRegistered) {
        let loginDetailas = new Login({
          mobileno: this.mobile_No,
          password: this.pin,
        });
        this._service.LoginIn(loginDetailas).subscribe((res) => {
          // console.log('res: ', res);
          if (res.data[0]?.userDetail) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['user-set-up']);
          }
        });
      } else {
        this.router.navigate(['user-set-up']);
      }
    } else if (this.password != this.pin && this.password.length == 4) {
      this.message = 'Incorrect Pin';
    }
  }

  onClick() {
    this.config.isPasswordInput = !this.config.isPasswordInput;
  }

  forgotPin() {
    this.router.navigate(['pin-recovery']);
  }
}
