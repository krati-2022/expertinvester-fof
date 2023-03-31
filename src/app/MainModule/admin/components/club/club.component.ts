import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  AddChannel(){
    this.router.navigate(['home/add-channel'])
  }

}
