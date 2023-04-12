import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  mobileNumber : any
  id : any
  constructor(private _ActivaedRoute: ActivatedRoute, private _service: SharedService) { }

  ngOnInit(): void {
    this.id  = this._ActivaedRoute.snapshot.paramMap.get('param1')
    // console.log('this.id: ', this.id);
    this.mobileNumber  = this._ActivaedRoute.snapshot.paramMap.get('param2')
    // console.log('this.mobileNumber: ', this.mobileNumber);
    this.GetFeedPost()
  }

  GetFeedPost(){
    this._service.GetFeedPostdetail(this.mobileNumber, this.id).subscribe(res =>{
    console.log('res: ', res);
      
    })
  }

}
