import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  toggleSideBar: boolean = true;
  screenWidth: any;
  constructor(private coreService: SharedService) {}

  ngOnInit(): void {
    this.coreService.toggleSidebar.subscribe(() => {
      //open your sidebar by setting classes, whatever
      this.toggleSideBar = !this.toggleSideBar;
      console.log(this.toggleSideBar);
    });
  }
}
