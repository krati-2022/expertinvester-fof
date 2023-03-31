import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-list',
  templateUrl: './expert-list.component.html',
  styleUrls: ['./expert-list.component.css']
})
export class ExpertListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToExpertProfilePage(){
    // console.log("hello");
    this.router.navigate(['home/expertProfile'])
  }
}
