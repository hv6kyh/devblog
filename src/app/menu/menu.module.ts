import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NbMenuModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { OtherModule } from './other/other.module';
import { HomeComponent } from './home/home.component';
import { PostModule } from './post/post.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [MenuComponent, HomeComponent],
  imports: [
    HttpClientModule,
    MenuRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    OtherModule,
    MarkdownModule.forChild(),
  ],
})
export class MenuModule {}
