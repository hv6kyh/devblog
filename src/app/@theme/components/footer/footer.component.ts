import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <nb-icon icon="star"></nb-icon>
      <!-- Created with ♥ by <b><a href="https://akveo.page.link/8V2f" target="_blank">Akveo</a></b> 2019 -->
      Powered By Angular + NestJs 2020 On Serverless Framwork!!
    </span>
    <div class="socials">
      <a href="#" onclick="alert('그런건 없어용~')" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {}
