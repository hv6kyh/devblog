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
import { HomeModule } from './home/home.module';
import { PostService } from './post/post.service';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    HttpClientModule,
    MenuRoutingModule,
    ThemeModule,
    NbMenuModule,
    // NbLayoutModule,
    OtherModule,
    // MarkdownModule.forChild(),
    HomeModule,
  ],
})
export class MenuModule {}
