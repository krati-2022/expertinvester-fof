import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AdminService } from '../../admin.service';

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
  model: any = {};
  data: any;
  sharedData: any;
  email = localStorage.getItem('email') || ''
  constructor(
    private _service: AdminService,
    private router: Router,
    private location: Location
  ) {}
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

  goBack() {
    this.location.back();
  }

  getUserDetails() {
    this._service.GetDetails(this.email).subscribe(res =>{
    // console.log('res: ', res);
      this.model.fullName = res.data.fullName;
      this.model.email = res.data.emailId;
    })
   
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this._service.search.next(this.searchTerm);
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['admin']);
  }
  userProfile() {
    // this.router.navigate(['home/profile-page']);
  }
  homePage() {
    this.router.navigate(['admin/home']);
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
