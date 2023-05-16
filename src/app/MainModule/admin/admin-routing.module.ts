import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { PaymentListComponent } from './Components/payment-list/payment-list.component';
import { ClubListComponent } from './Components/club-list/club-list.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { AuthGuard } from './Authentication/auth.guard';
import { AddClubComponent } from './Components/add-club/add-club.component';

const routes: Routes = [
  {
    path: 'home',
    component: AdminHomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'club-list', component: ClubListComponent },
      { path: 'add-club', component: AddClubComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'payment-list', component: PaymentListComponent },
      { path: 'setting', component: SettingsComponent },
    ],
  },
  { path: '', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
