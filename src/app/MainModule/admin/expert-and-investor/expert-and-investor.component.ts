import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-and-investor',
  templateUrl: './expert-and-investor.component.html',
  styleUrls: ['./expert-and-investor.component.css']
})
export class ExpertAndInvestorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHomePage(){
    this.router.navigate(['home'])
  }

}
