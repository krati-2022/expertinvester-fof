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
  searchKey: string = ''
  constructor(
    private _service: SharedService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute
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

  getClubDetails() {
    this._service
      .GetClubDetails(this.mobile_number, this.clubListId)
      .subscribe((res: any) => {
        console.log('res: ', res.data[0]);
        this.clubDetails = res.data;
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
}
