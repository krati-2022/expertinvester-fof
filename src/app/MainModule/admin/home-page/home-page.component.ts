import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  ismobileNumberExist = localStorage.getItem('mobile_No')
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.ismobileNumberExist){
      this.router.navigate(['enter-pin'])
    }
  }

}
