import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css'],
})
export class TradesComponent implements OnInit {
  addPostForm: FormGroup | any;
  name: any;
  mobileNumber: any;
  userName: any;
  channelId: any;
  imageSrc: string = '';
  tradetype: string = 'BUY';
  submitted: boolean = false;
  isLoading: boolean = false;
  maxFileSize: number = 200 * 1024;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '10rem',
    translate: 'no',
    rawPaste: false,
    showToolbar: false,
  };
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _service: SharedService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.name = this._ActivatedRoute.snapshot.paramMap.get('param1');
    this.channelId = this._ActivatedRoute.snapshot.paramMap.get('param2');
    this.mobileNumber = this._ActivatedRoute.snapshot.paramMap.get('param3');
    this.userName = this._ActivatedRoute.snapshot.paramMap.get('param4');
    this.addPostForm = this.formBuilder.group({
      Mobile_No: [this.mobileNumber, Validators.required],
      channelId: [this.channelId, Validators.required],
      stockname: [this.name, Validators.required],
      interval: ['', Validators.required],
      entryprice: ['', Validators.required],
      targetprice: ['', Validators.required],
      stoploss: ['', Validators.required],
      imageurl: [null],
      externallink: [''],
      description: ['', Validators.required],
      tradetype: [this.tradetype, Validators.required],
    });
  }

  goBack() {
    this.location.back();
  }
  get addPostControl() {
    return this.addPostForm.controls;
  }

  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9

    if (charCode < 48 || charCode > 57) {
      if (charCode == 46) {
        return true;
      }
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    if (file.size > this.maxFileSize) {
      // alert('');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'warning',
        title: 'File size exceeds the limit of 200kb',
      });
      return;
    }
    this.imageSrc = event.target.files[0].name;
    this.addPostForm.patchValue({
      imageurl: file,
    });
    this.addPostForm.get('imageurl').updateValueAndValidity();
  }

  getTab(event: any) {
    // console.log('event: ', event.target.id);
    switch (event.target.id) {
      case 'BUY':
        this.tradetype = event.target.id;
        // console.log('this.tradetype: ', this.tradetype);
        break;
      case 'SELL':
        this.tradetype = event.target.id;
        // console.log('this.tradetype: ', this.tradetype);
        break;
    }
  }

  onSubmit() {
    this.submitted = true;
    // console.log('this.addPostForm: ', this.addPostForm.value);
    if (this.addPostForm.invalid) {
      return;
    }

    var formData: any = new FormData();
    formData.append('Mobile_No', this.addPostForm.get('Mobile_No').value);
    formData.append('channelId', this.addPostForm.get('channelId').value);
    formData.append('interval', this.addPostForm.get('interval').value);
    formData.append('entryprice', this.addPostForm.get('entryprice').value);
    formData.append('targetprice', this.addPostForm.get('targetprice').value);
    formData.append('stoploss', this.addPostForm.get('stoploss').value);
    formData.append('externallink', this.addPostForm.get('externallink').value);
    formData.append('description', this.addPostForm.get('description').value);
    formData.append('imageurl', this.addPostForm.get('imageurl').value);
    formData.append('tradetype', this.addPostForm.get('tradetype').value);
    formData.append('stockname', this.addPostForm.get('stockname').value);
    this.isLoading = true;

    this._service.AddPost(formData).subscribe((res) => {
      // console.log('res: ', res);
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
        title: res.message,
      });
      this.addPostForm.reset();
      this.submitted = false;
      this.router.navigate([
        'home/channel-details/' +
          this.channelId +
          '/' +
          this.mobileNumber +
          '/' +
          this.userName +
          '/true',
      ]);
      this.isLoading = false;
    },(error)=>{
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
        title: 'Something Went Wrong',
      });
         this.isLoading = false;
       }
    });
  }
}
