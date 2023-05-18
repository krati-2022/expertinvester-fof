import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { SharedService } from 'src/app/Service/shared.service';
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
  isLoading: boolean = false
  constructor(
    private _ActivaedRoute: ActivatedRoute,
    private _service: SharedService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this._ActivaedRoute.snapshot.paramMap.get('param1');
    // console.log('this.id: ', this.id);
    this.mobileNumber = this._ActivaedRoute.snapshot.paramMap.get('param2');
    // console.log('this.mobileNumber: ', this.mobileNumber);
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
    this.isLoading = true
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

  imagePreview() {
    // (<any>$('#exampleModal1').modal('show'))
  }
}
