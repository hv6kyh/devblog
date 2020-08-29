import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [{
  path: '',
  component: MenuComponent,
  children: [
    {
      path: 'post',
      loadChildren: () => import('./post/post.module')
        .then(m => m.PostModule),
    },
    {
      path: '',
      redirectTo: 'post',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {
}
