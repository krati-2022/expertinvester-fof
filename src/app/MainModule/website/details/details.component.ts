import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';
declare var $ :any
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  mobileNumber: any;
  id: any;
  feedPostDetail: any;
  galleryOptions: NgxGalleryOptions[] | any;
  galleryImages: NgxGalleryImage[] | any;
  isLoading: boolean = false;
  isShare: boolean = false;
  shareId: any;
  isShowComment: boolean = false;
  data: any;
  isCommented : any
  userId: any;
  addCommnetFrom: FormGroup | any
  constructor(
    private _ActivaedRoute: ActivatedRoute,
    private _service: SharedService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this._ActivaedRoute.snapshot.paramMap.get('param1');
    // console.log('this.id: ', this.id);
    this.mobileNumber = this._ActivaedRoute.snapshot.paramMap.get('param2');
    this._service.getData().subscribe(data => {
    // console.log('data: ', data);
      this.userId = data.id;
    })
    // console.log('this.mobileNumber: ', this.mobileNumber);
    this.addCommnetFrom = new FormGroup({
      message: new FormControl('', Validators.required),
      
    });
    this.GetFeedPost();

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        previewDescription: false,
        // thumbnailsColumns: 4,
        // imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        previewDescription: false,
      },

      {
        breakpoint: 400,
        preview: false,
        previewDescription: false,
      },
    ];
  }

  goBack() {
    this.location.back();
  }

  GetFeedPost() {
    this.isLoading = true;
    this._service
      .GetFeedPostdetail(this.mobileNumber, this.id)
      .subscribe((res) => {
        this.feedPostDetail = res.data;
        this.isLoading = false;
        let arr = [];
        arr.push(...this.feedPostDetail);
        // console.log('arr: ', arr);

        arr.map((ele: any) => {
          ele.small = ele.imageurl;
          ele.medium = ele.imageurl;
          ele.big = ele.imageurl;
          // delete ele.description
        });
        // console.log(arr);
        this.galleryImages = arr;
      });
  }

  GetComments() {
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    this._service.GetComments(mobile_No, this.id).subscribe((res: any) => {
      this.data = res.data[0].comments;
      this.isCommented = this.data.length
      
      // console.log('this.data: ', this.data);
    });
  }

  imagePreview() {
    // (<any>$('#exampleModal1').modal('show'))
  }

  getComments() {
    this.isShowComment = true;
    this.GetComments();
  }

  share(id: any) {
    this.shareId = id;
    this.isShare = !this.isShare;
  }

  Comment(){
    let data = {
      feedPostId: this.id,
      message: this.addCommnetFrom.value.message,
      userId: this.userId,
    };
    // console.log('data: ', data);
    this._service.AddComment(data).subscribe(res => {
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
         icon: 'success',
         title: 'Comment Added Successfully',
       });
       this.GetComments()
    })
  }
}
