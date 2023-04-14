import { Component, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  ismobileNumberExist = localStorage.getItem('mobile_number')
  hide: boolean = false
  toggleSideBar : boolean = true
  constructor(private router: Router, private coreService: SharedService) {
    if(this.router.url == '/home/profile-page' || this.router.url == '/home/contact'){
      this.hide = true
    }
   }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // console.log('Route changed:', event.url);
      if( event.url == '/home/profile-page' || event.url == '/home/contact'){
        this.hide = true
      }else{
        this.hide = false
      }
      // do something when the route changes
    });
   if(!this.ismobileNumberExist){
    this.router.navigate([''])
   }
   this.coreService.toggleSidebar.subscribe(() => {
    //open your sidebar by setting classes, whatever
    this.toggleSideBar = !this.toggleSideBar
  });
  }

 

}
