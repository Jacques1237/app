import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'image-modal', loadChildren: './image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login-confirm', loadChildren: './login/login-confirm/login-confirm.module#LoginConfirmPageModule' },
  { path: 'register', loadChildren: './login/register/register.module#RegisterPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
