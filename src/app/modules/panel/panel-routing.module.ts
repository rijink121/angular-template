import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';

import { PanelComponent } from './panel.component';

const routes: Routes = [{ path: '', component: PanelComponent, children: [{ path: 'home', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) }, { path: 'members', loadChildren: () => import('../members/members.module').then(m => m.MembersModule) }, { path: '**', redirectTo: 'home' }], canActivateChild: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
