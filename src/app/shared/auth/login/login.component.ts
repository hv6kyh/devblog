import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  // styleUrls: ['../auth.component.scss'],
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  ngOnInit(): void {
    console.log('로그인 화면 출력');
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style.display = 'none';
    }
  }
}
