import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  AddChannel(){
    this.router.navigate(['home/add-channel'])
  }
  goToListGroup(){
    this.router.navigate(['home/listGroup'])
  }

}
