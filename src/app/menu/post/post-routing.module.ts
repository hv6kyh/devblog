import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { WriteComponent } from './write/write.component';
import { AuthGuardService } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'write',
    component: WriteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':post_id',
    component: DetailComponent,
  },
  {
    path: '',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
