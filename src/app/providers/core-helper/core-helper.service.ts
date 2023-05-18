import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CoreHelperService {
  constructor() {}

  //   getLoggedinAdmin = () => {
  //     var userDetail = localStorage.getItem('userDetail');
  //     if (userDetail !== null && userDetail !== undefined && userDetail !== '') {
  //       return JSON.parse(userDetail) as UserDetail;

  //     } else{
  //       return
  //     }
  //  };
  IsLoggedIn() {
    return localStorage.getItem('authToken') != null;
    // return localStorage.getItem('token') != null;
    // return localStorage.getItem('Token') != null;
  }

  GetToken() {
    return localStorage.getItem('authToken') || '';
  }

  getNameValidation(): ValidatorFn {
    return (control: AbstractControl): any => {
      if (control.value) {
        const regex = new RegExp('^[a-zA-Z]+$');
        const valid = regex.test(control.value);
        if (!valid) {
          return { invalidName: true };
        }
      }
    };
  }
}
