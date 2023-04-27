import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  public searchTerm!: string;
  searchFilterForm: FormGroup | any;
  hide: boolean = true;
  screenWidth: any;

  constructor(private _service: SharedService, private router: Router) {}
  ngOnInit(): void {
    this.searchFilterForm = new FormGroup({
      name: new FormControl(''),
    });
    this.getWindowSize()
  }
  public openSidebar() {
    this._service.toggleSidebar.emit();
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this._service.search.next(this.searchTerm);
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  userProfile() {
    this.router.navigate(['home/profile-page']);
  }
  homePage() {
    this.router.navigate(['home']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getWindowSize();
  }

  getWindowSize() {
    this.screenWidth = window.innerWidth;
     this._service.toggleSidebar.subscribe(() => {
       this.hide = !this.hide;
      //  console.log('this.hide: ', this.hide);
     });
    // console.log('this.screenWidth: ', this.screenWidth);
    // if (this.screenWidth < 1200) {
    //   this.hide = false;
    // } else {
    //   this.hide = true;
    // }
  }
}
