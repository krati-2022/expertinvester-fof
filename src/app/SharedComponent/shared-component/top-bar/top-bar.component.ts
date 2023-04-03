import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  constructor(private sharedService : SharedService) {}
  ngOnInit(): void {
  }
  toggleme(){
   this.sharedService.emitData();
   console.log(this.sharedService.emitData());
}
}
