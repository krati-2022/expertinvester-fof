import { Component, ContentChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminLogin } from './admin-login.classes';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export interface LoginResponse {
  email: string;
  mobileNo: string;
  fullName: string;
  validaty: string;
  expiredTime: string;
  token: string;
}
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm: FormGroup | any;
  submitted: boolean = false;
  adminLoginDetails = new AdminLogin();
  loginResponse: LoginResponse[] = [];
  isHideShowPassword: boolean = false;
  inputType: string = 'password';
  constructor(private _service: AdminService, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  get loginControl() {
    return this.loginForm.controls;
  }

  proceed() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.adminLoginDetails = new AdminLogin({
      emailId: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
    // console.log('this.adminLoginDetails: ', this.adminLoginDetails);
    this.isLoading = true;
    this._service.ProceedToLogin(this.adminLoginDetails).subscribe(
      (res: any) => {
        // console.log('res: ', res);

        // localStorage.setItem('authToken', res.data.token);
        // this.isLoading = false
        switch (res.status) {
          case 'Success':
            localStorage.setItem('authToken', res.data.token);
            localStorage.setItem('email', res.data.email);
            this.isLoading = false;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['admin/home']);
              });
            break;
          case 'Failed':
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
              title: res.message,
            });
            this.isLoading = false;
            break;
        }
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
            title: error.error,
          });
          this.isLoading = false;
        }
      }
    );
  }

  hideShowPassword() {
    this.isHideShowPassword = !this.isHideShowPassword;
    this.inputType = this.isHideShowPassword ? 'text' : 'password';
  }
}
