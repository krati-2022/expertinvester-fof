import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentRoutingModule } from './shared-component-routing.module';
import { CommenSelectionComponent } from './commen-selection/commen-selection.component';

@NgModule({
  declarations: [
    CommenSelectionComponent
  ],
  imports: [
    CommonModule,
    SharedComponentRoutingModule
  ]
})
export class SharedComponentModule { }
