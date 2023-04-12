import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentRoutingModule } from './shared-component-routing.module';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    SharedComponentRoutingModule
  ]
})
export class SharedComponentModule { }
