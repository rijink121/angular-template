import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent } from './members.component';
import { MemberComponent } from './member/member.component';

const routes: Routes = [{ path: '', component: MembersComponent }, { path: ':id', component: MemberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
