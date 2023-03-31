import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  constructor(private _service: SharedService) {}

  ngOnInit(): void {}

  public openSidebar() {
    this._service.toggleSidebar.emit();
  }
}
