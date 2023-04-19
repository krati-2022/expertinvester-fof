import { Component, HostListener, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  hide: boolean = true;
  screenWidth = 1440;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.onWidthChange();
  }

  constructor(private coreService: SharedService) {}

  ngOnInit(): void {
    // console.log('this.screenWidth == 1440: ', this.screenWidth <= 1440);
    if(this.screenWidth < 1440){
      this.hide = false
    }else{
      this.hide = true
    }
    this.coreService.toggleSidebar.subscribe(() => {
      //open your sidebar by setting classes, whatever
      this.hide = !this.hide;
    });
  }


  onWidthChange() {
    if (this.screenWidth < 1440) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }
}
