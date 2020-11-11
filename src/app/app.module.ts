/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { API_URL } from './shared/config/config';
import { AuthGuardService } from './shared/auth/auth-guard.service';

// function that returns `MarkedOptions` with renderer override
// const markedOptionsFactory = (): MarkedOptions => {
//   const renderer = new MarkedRenderer();

//   renderer.blockquote = (text: string) => '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';

//   return {
//     renderer: renderer,
//     gfm: true,
//     breaks: false,
//     pedantic: false,
//     smartLists: true,
//     smartypants: false,
//   };
// };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    MarkdownModule.forRoot({
      /**
       * 글 상세 컴포넌트에서 이미지 클릭 이벤트 부여, p 태그 스타일 변경을 위해
       * sanitize를 disable 처리함
       */
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        // useFactory: markedOptionsFactory,
        useValue: {
          gfm: true,
          breaks: true,
        },
      },
    }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: API_URL,
          token: {
            class: NbAuthJWTToken,
            key: 'data.access_token',
          },
          login: {
            endpoint: '/user/signin',
            method: 'post',
          },
          logout: {
            endpoint: '',
          },
        }),
      ],
      forms: {},
    }),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
