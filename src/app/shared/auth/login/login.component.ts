import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  ngOnInit(): void {
    console.log('로그인 화면 출력');
    // const el = document.getElementById('nb-global-spinner');
    // if (el) {
    //   el.style.display = 'none';
    // }
  }

  showAlert(str: string) {
    switch (str) {
      case 'password':
        alert('저런!\n다시 한번 생각해보세요.');
        break;

      case 'join':
        alert('서버비용 기부 후 가입 가능');
        break;
    }
  }
}
