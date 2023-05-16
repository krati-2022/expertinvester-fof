import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
})
export class ClubListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  addClub(){
    this.router.navigate(['admin/home/add-club'])
  }
}
