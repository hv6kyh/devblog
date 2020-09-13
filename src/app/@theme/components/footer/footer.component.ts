import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <nb-icon icon="star"></nb-icon>
      <!-- Created with ♥ by <b><a href="https://akveo.page.link/8V2f" target="_blank">Akveo</a></b> 2019 -->
      Powered By Angular + NestJs 2020 On Serverless Framework!!
    </span>
    <div class="socials">
      <a href="https://github.com/hv6kyh" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {}
