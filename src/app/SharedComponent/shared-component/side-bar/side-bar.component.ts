import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(private sharedService : SharedService) { }
  ngOnInit(): void {
  }
}

