import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [{ path: 'auth/login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule), canActivate: [LoginGuard] }, { path: 'apps', loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule), canActivate: [AuthGuard] }, { path: '**', redirectTo: 'apps/home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
