import { Component, HostListener, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SharedService } from 'src/app/Service/shared.service';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  hide: boolean = false;
  toggleSideBar: boolean = true;
  screenWidth: any;
  constructor(private router: Router, private coreService: AdminService) {
   
  }

  ngOnInit(): void {
    this.getWindowSize();
    // console.log('this.router.url: ', this.router.url);
    if (this.router.url == '/home') {
      this.hide = true;
    }
   
    this.coreService.toggleSidebar.subscribe(() => {
      //open your sidebar by setting classes, whatever
      this.toggleSideBar = !this.toggleSideBar;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getWindowSize();
  }

  getWindowSize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1536) {
      this.toggleSideBar = true;
    }
  }

  close() {
    this.toggleSideBar = true;
  }
}
