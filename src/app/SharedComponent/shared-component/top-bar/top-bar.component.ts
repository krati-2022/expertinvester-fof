import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  constructor(private _service: SharedService, private router: Router) {}

  ngOnInit(): void {}

  public openSidebar() {
    this._service.toggleSidebar.emit();
  }

  signOut(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
