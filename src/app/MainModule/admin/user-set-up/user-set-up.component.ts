import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-set-up',
  templateUrl: './user-set-up.component.html',
  styleUrls: ['./user-set-up.component.css']
})
export class UserSetUpComponent implements OnInit {
  selectedValue : string = ''
  selectUserRoleForm : FormGroup | any
  submitted :boolean = false
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.selectUserRoleForm = new FormGroup({
      userRole : new FormControl('', Validators.required)
    })
  }

  get selectUserRoleControl() { return this.selectUserRoleForm.controls ;}

  onChange(event:any){
    this.selectedValue = event.target.id
  }

  onSubmitRouteChnage(){
    this.submitted = true
    if(this.selectedValue == ''){
      return
    }
    this.router.navigate([this.selectedValue])
  }
}
