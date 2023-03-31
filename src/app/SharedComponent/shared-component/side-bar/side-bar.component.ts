import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  hide : boolean = false
  constructor(private coreService: SharedService ) { }

  ngOnInit(): void {
    this.coreService.toggleSidebar.subscribe(() => {
      //open your sidebar by setting classes, whatever
      this.hide = !this.hide
    });
  }

}
