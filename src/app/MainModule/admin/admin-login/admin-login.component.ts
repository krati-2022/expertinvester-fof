import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminLogin } from './admin-login.classes';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm : FormGroup | any
  submitted: boolean = false;
  adminLoginDetails = new AdminLogin()
  constructor() {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get loginControl() { return this.loginForm.controls; }

  proceed(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return
    }
    this.adminLoginDetails = new AdminLogin({
      emial: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    console.log('this.adminLoginDetails: ', this.adminLoginDetails);
  }
}
