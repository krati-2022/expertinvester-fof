import { Location } from '@angular/common';
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
  showSearch: boolean = false;
  screenWidth: any;
  mobileNumber = localStorage.getItem('mobile_number') || '';
  model: any = {};
  data: any;
  sharedData: any;
  constructor(private _service: SharedService, private router: Router, private location: Location) {}
  ngOnInit(): void {
    this.searchFilterForm = new FormGroup({
      name: new FormControl(''),
    });
    this._service.showSearchBar.subscribe(() => {
      this.showSearch = true;

      // console.log('this.showSearch: ', this.showSearch);
    });

    this.getUserDetails();
    this.getWindowSize();
  }
  public openSidebar() {
    this._service.toggleSidebar.emit();
  }

  goBack(){
    this.location.back()
  }

  getUserDetails() {
    let mobile_number = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_number = joinString;
    }
    this._service.GetUserDetails(mobile_number).subscribe((res) => {
      // console.log('res: ', res);
      this.data = res.data;
      this.model.name = this.data.name;
      this.model.userType = this.data.userType;
      this._service.setData(this.data);
    });
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
  }

  @HostListener('window:scroll', [])
  public onScrolled() {
    if (window.pageYOffset < 100) {
      this.showSearch = false;
    }
  }
}
