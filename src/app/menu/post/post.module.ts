import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbListModule, NbRouteTabsetModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ListComponent } from './list/list.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
  ],
})
export class PostModule { }
