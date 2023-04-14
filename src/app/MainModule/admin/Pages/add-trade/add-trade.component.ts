import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-trade',
  templateUrl: './add-trade.component.html',
  styleUrls: ['./add-trade.component.css']
})
export class AddTradeComponent implements OnInit {
  AddFeedForm : FormGroup | any
  apiUrl = environment.apiUrl
  mobile_number: any
  clubListId: any
  name: any
  imageSrc: string = ''
  submitted : boolean = false
  formData:any  = new FormData()
  isLoading: boolean = false
  constructor(private _service: SharedService, private router: Router, private _ActivatedRoute : ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.clubListId = this._ActivatedRoute.snapshot.paramMap.get('param1')
    this.mobile_number = this._ActivatedRoute.snapshot.paramMap.get('param2')
    this.name = this._ActivatedRoute.snapshot.paramMap.get('param3')
    // console.log('this.name: ', this.name);
    this.AddFeedForm = new FormGroup({
      Mobile_No : new FormControl(this.mobile_number),
      ClublistId : new FormControl(this.clubListId),
      externallink : new FormControl(''),
      description : new FormControl('', Validators.required),
      imageurl : new FormControl('')
    })
  }

  get AddFeedControl() { return this.AddFeedForm.controls }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.imageSrc = event.target.files[0].name
    this.AddFeedForm.patchValue({
      imageurl: file,
    });
    this.AddFeedForm.get('imageurl').updateValueAndValidity();
  }

  onSubmit(){
    this.submitted = true
    if(this.AddFeedForm.invalid){
      return
    }

    this.formData.append('ClublistId', this.AddFeedForm.get('ClublistId').value)
    this.formData.append('Mobile_No', this.AddFeedForm.get('Mobile_No').value)
    this.formData.append('externallink', this.AddFeedForm.get('externallink').value)
    this.formData.append('description', this.AddFeedForm.get('description').value)
    this.formData.append('imageurl', this.AddFeedForm.get('imageurl').value)


    // this._service.AddFeedPost(this.formData).subscribe(res =>{
    // console.log('res: ', res);

    // })
    this.isLoading = true
    this.http.post(this.apiUrl + 'AddFeedPost', this.formData).subscribe({
      next: (response:any) =>{
        // console.log('response: ', response.message);
        // debugger;
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
          title: response.message,
        });
        this.AddFeedForm.reset();
        this.submitted = false;
        this.imageSrc = ''

        // this.router.navigate(['home/club']);
        this.isLoading = false
      }, error : (error) =>{
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
            title: 'Something went wrong please try again',
          });
          this.isLoading = false
        }
      }
    })

  }

}
