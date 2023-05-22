import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css'],
})
export class ListGroupComponent implements OnInit {
  id: any;
  mobileNumber: any;
  isLoading: boolean = false;
  feedPostChannelDetail: any;
  expectedMove: any;
  isShare:boolean = false
  constructor(
    private router: Router,
    private location: Location,
    private _service: SharedService,
    private _ActivaedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._ActivaedRoute.snapshot.paramMap.get('param1');
    this.mobileNumber = this._ActivaedRoute.snapshot.paramMap.get('param2');
    this.GetChannelPost();
  }

  // goToDetail(){
  //   this.router.navigate(['home/details'])
  // }
  goBack() {
    this.location.back();
  }

  GetChannelPost() {
    this.isLoading = true;
    this._service
      .GetFeedPostChanneldetail(this.mobileNumber, this.id)
      .subscribe((res) => {
        this.feedPostChannelDetail = res.data;
        this.isLoading = false;
        let data =
          this.feedPostChannelDetail[0].entryprice -
          this.feedPostChannelDetail[0].targetprice;
        data = Math.abs(data);
        this.expectedMove =
          (data * this.feedPostChannelDetail[0].entryprice) / 100;
        //  console.log('this.expectedMove: ', this.expectedMove);
        //  console.log('data: ', data);

        console.log('this.feedPostChannelDetail: ', this.feedPostChannelDetail);
      });
  }

  like(channelId: string, status: boolean) {
    let formData = {
      channelId: channelId,
      like: status,
      mobileno: this.mobileNumber,
    };

    this._service.ChannelPostLikeDislike(formData).subscribe((res) => {
      console.log('res: ', res);
      this.GetChannelPost();
      // this.getLikes(id)
    });
  }

  share() {
    this.isShare = !this.isShare;
  }
}
