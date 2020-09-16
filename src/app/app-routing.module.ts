import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

export const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    loadChildren: () => import('./shared/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
