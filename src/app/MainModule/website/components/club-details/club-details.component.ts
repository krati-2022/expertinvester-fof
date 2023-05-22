import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css'],
})
export class ClubDetailsComponent implements OnInit {
  mobile_number: any;
  clubListId: any;
  name: any;
  clubDetails: any;
  searchKey: string = '';
  isLoading: boolean = false;
  isShare: boolean = false;
  shareId: any;
  constructor(
    private _service: SharedService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.clubListId = this._ActivatedRoute.snapshot.paramMap.get('param1');
    this.mobile_number = this._ActivatedRoute.snapshot.paramMap.get('param2');
    this.name = this._ActivatedRoute.snapshot.paramMap.get('param3');
    this.getClubDetails();
    this._service.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  goBack() {
    this.location.back();
  }
  getClubDetails() {
    this.isLoading = true;
    this._service
      .GetClubDetails(this.mobile_number, this.clubListId)
      .subscribe((res: any) => {
        // console.log('res: ', res.data[0]);
        this.clubDetails = res.data;
        this.isLoading = false;
      });
  }
  AddClub() {
    // console.log('clublistId: ', clublistId);
    this.router.navigate([
      'home/add-trade/' +
        this.clubListId +
        '/' +
        this.mobile_number +
        '/' +
        this.name,
    ]);
  }

  getCulbDetails(item: any) {
    // console.log('item: ', item);
    this.router.navigate([
      'home/details/' + item.id + '/' + this.mobile_number,
    ]);
  }

  share(id: any) {
    this.shareId = id;
    this.isShare = !this.isShare;
  }
}
