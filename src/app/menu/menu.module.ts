import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { OtherModule } from './other/other.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [HttpClientModule, MenuRoutingModule, ThemeModule, NbMenuModule, OtherModule],
})
export class MenuModule {}
