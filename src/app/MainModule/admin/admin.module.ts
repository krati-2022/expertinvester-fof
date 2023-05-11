import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, HashLocationStrategy ,LocationStrategy } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
   
  ],
  schemas: [],
  providers:[]
})
export class AdminModule {}
