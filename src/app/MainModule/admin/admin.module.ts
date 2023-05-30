import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, HashLocationStrategy ,LocationStrategy } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFocusDirective } from 'src/app/Utils/form-focus.directive';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { TopBarComponent } from './shared-component/top-bar/top-bar.component';
import { SideBarComponent } from './shared-component/side-bar/side-bar.component';
import { NgChartsModule } from 'ng2-charts';
import { UserListComponent } from './Components/user-list/user-list.component';
import { PaymentListComponent } from './Components/payment-list/payment-list.component';
import { ClubListComponent } from './Components/club-list/club-list.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { AddClubComponent } from './Components/add-club/add-club.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditClubComponent } from './Components/edit-club/edit-club.component';
import { AdminProfileComponent } from './Components/admin-profile/admin-profile.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    TopBarComponent,
    SideBarComponent,
    FormFocusDirective,
    AdminDashboardComponent,
    AdminHomeComponent,
    UserListComponent,
    PaymentListComponent,
    ClubListComponent,
    SettingsComponent,
    AddClubComponent,
    EditClubComponent,
    AdminProfileComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    AngularEditorModule
  ],
  schemas: [],
  providers:[]
})
export class AdminModule {}
