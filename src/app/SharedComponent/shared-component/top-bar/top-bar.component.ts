import { Component, OnInit } from '@angular/core';
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
  searchFilterForm : FormGroup | any
  constructor(private _service: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.searchFilterForm = new FormGroup({
      name: new FormControl('')
    })
  }

  public openSidebar() {
    this._service.toggleSidebar.emit();
  }

  
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this._service.search.next(this.searchTerm);
  }

  signOut(){
    localStorage.clear()
    this.router.navigate([''])
  }

  userProfile(){
    this.router.navigate(['home/profile-page'])
  }
}
