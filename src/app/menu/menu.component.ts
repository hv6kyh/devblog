import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {

  // menu: Menu[];
  menu = [{
    'children': [
      {
        'link': '/pages/post/frontend',
        'title': '프론트엔드',
      },
      {
        'link': '/pages/post/backend',
        'title': '백엔드',
      },
    ],
    'icon': 'layout-outline',
    'title': 'post',
  }];
  http$: Subscription;

  constructor(private readonly http: HttpClient) {
    // this.http$ = this.http
    //   .get<APIResponse>('http://localhost:3000/dev/api' + '/menu')
    //   .subscribe((resp: APIResponse) => {
    //     if (resp.status === 200 && resp.data) {
    //       this.menu = resp.data;
    //     }
    //   });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.http$) {
      this.http$.unsubscribe();
    }
  }
}
