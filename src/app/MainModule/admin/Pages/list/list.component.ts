import { Component, OnInit } from '@angular/core';
import {data} from '../../../../Utils/list'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  Data = data;
  channelId: any
  mobileNumber: any
  constructor(private router: Router, private _ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log(this.Data);
    this.channelId = this._ActivatedRoute.snapshot.paramMap.get('param1')
    this.mobileNumber = this._ActivatedRoute.snapshot.paramMap.get('param2');
  }

  getDetail(items:any){
    // console.log(items);
    this.router.navigate(['home/trades/' + items.name + '/' + this.channelId + '/' + this.mobileNumber]);
  }
}
