import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  hide: boolean = true;
  screenWidth: any;

  constructor(private coreService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.getWindowSize();
    this.coreService.toggleSidebar.subscribe(() => {
      this.hide = !this.hide;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getWindowSize();
  }

  getWindowSize() {
    this.screenWidth = window.innerWidth;
    // console.log('this.screenWidth: ', this.screenWidth);
    if (this.screenWidth < 1200 ) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  Feed() {
     this.router.navigate(['home/feed']).then(() => {
       window.location.reload()
     });
  }
}
