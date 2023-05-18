import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./MainModule/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./MainModule/website/website.module').then(m => m.WebsiteModule)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./MainModule/main/main.module').then(m => m.MainModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration : 'enabled'}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
