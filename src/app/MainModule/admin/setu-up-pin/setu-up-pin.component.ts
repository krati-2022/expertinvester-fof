import { Component, OnInit } from '@angular/core';
import { SetPin } from './set-up-pin.classes';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-setu-up-pin',
  templateUrl: './setu-up-pin.component.html',
  styleUrls: ['./setu-up-pin.component.css']
})
export class SetuUpPinComponent implements OnInit {
  pinDetails = new SetPin();
  showOtpComponent = true;
  mobile_No:any = localStorage.getItem('mobile_number')
  password!:string
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
  constructor(private router: Router, private _service: SharedService) { }

  ngOnInit(): void {
    if(!this.mobile_No){
      this.router.navigate([''])
    }
  }

  onOtpChange(otp: string) {
    this.password = otp;
    // console.log('this.password: ', this.password.length);
    if(this.password.length == 4){
      let number = this.mobile_No
      this.pinDetails = new SetPin({
        mobileno: number,
        password: this.password

      });
      this._service.SetPin(this.pinDetails).subscribe(res =>{
      // console.log('res: ', res);
        // localStorage.removeItem('mobile_number')
        localStorage.setItem('pin', this.password)
        this.router.navigate(['enter-pin'])
      // console.log('res: ', res);

      })
    }
    // console.log('this.otp: ', this.otp);
  }
  onClick(){
    this.config.isPasswordInput = !this.config.isPasswordInput
  }
}
