import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css'],
})
export class ListGroupComponent implements OnInit {
  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {}

  // goToDetail(){
  //   this.router.navigate(['home/details'])
  // }
  goBack() {
    this.location.back();
  }
}
