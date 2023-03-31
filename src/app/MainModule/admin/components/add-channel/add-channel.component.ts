import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onChange(event:any){
  // console.log('event: ', event.target.id);
  if(event.target.id == 'gridRadios2'){
    this.router.navigate(['home/upgrade-plan'])
  }
  }
}
