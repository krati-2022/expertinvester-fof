import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddSettings } from './settings.classes';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  isLoading: boolean = false;
  AddSettingForm: FormGroup | any;
  submitted: boolean = false;
  settingsForm = new AddSettings()
  constructor(private location: Location) {}

  ngOnInit(): void {
    this.AddSettingForm = new FormGroup({
      externalLink : new FormControl('', Validators.required)
    });
  }

  goBack(){
    this.location.back()
  }

  get AddSettingsControls() {
    return this.AddSettingForm.controls;
  }

  submit() {
    this.submitted = true
    if(this.AddSettingForm.invalid){
      return
    }

    this.settingsForm = new AddSettings({
      externalLink : this.AddSettingForm.value.externalLink
    })
    console.log('this.settingsForm: ', this.settingsForm);
  }
}
