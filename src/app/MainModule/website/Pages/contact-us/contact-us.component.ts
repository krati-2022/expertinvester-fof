import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUs } from './contact-us.classes';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup | any
  submitted: boolean = false
  constructor(private _service: SharedService) {}

  ngOnInit(): void {
    this.contactUsForm = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([Validators.email, Validators.required])
      ),
      description: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
    });
  }

  get contactUsControl() {return this.contactUsForm.controls}

  submit(){
    this.submitted = true
    if(this.contactUsForm.invalid){
      return
    }
    let formData = {
      email: this.contactUsForm.get('email').value,
      description: this.contactUsForm.get('description').value,
      firstName: this.contactUsForm.get('firstName').value,
      lastName: this.contactUsForm.get('lastName').value,
      mobileNumber: this.contactUsForm.get('mobileNumber').value,
    };
    this._service.ContactUs(formData).subscribe(res =>{
    console.log('res: ', res);
      
    })
  }
}
