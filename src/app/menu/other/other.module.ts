import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { DonationComponent } from './donation/donation.component';

@NgModule({
  declarations: [NotFoundComponent, DonationComponent],
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
  ],
})
export class OtherModule { }
