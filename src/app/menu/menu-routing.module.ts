import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { NotFoundComponent } from './other/not-found/not-found.component';

const routes: Routes = [
  // {
  //   matcher: (url) => {
  //     if (url.length === 1 && url[0].path.startsWith('post')) {
  //       console.log('url matcher에서 감지: ', url);
  //       return {
  //         consumed: url,
  //       };
  //     }
  //     return null;
  //   },
  // },
  {
  path: '',
  component: MenuComponent,
  children: [
    {
      // matcher: (url) => {
      //   if (url.length === 1 && url[0].path.startsWith('post')) {
      //     console.log('url matcher에서 감지: ', url);
      //     return {
      //       consumed: url,
      //     };
      //   }
      //   return null;
      // },
      path: 'post/:ctg',
      loadChildren: () => import('./post/post.module')
        .then(m => m.PostModule),
    },
    {
      path: '',
      redirectTo: 'post',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {
}
