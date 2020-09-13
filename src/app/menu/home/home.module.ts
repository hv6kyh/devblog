import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { PostModule } from '../post/post.module';
import { NbLayoutModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { MarkdownModule } from 'ngx-markdown';
import { PostService } from '../post/post.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, NbCardModule, NbButtonModule, MarkdownModule.forChild()],
  exports: [HomeComponent],
})
export class HomeModule {}
