import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APISuccess, APIError } from '../shared/constant/DTO';
import { API_URL } from '../shared/config/config';

interface Menu {
  title: string;
  icon: string;
  children: {
    title: string;
    link: string;
  };
}

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly prefix = 'menu';
  menus: Menu[] = [];
  http$: Subscription;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http$ = this.http.get<APISuccess | APIError>(API_URL + `/${this.prefix}`).subscribe((resp) => {
      if (resp.success) {
        resp = resp as APISuccess;
        this.menus = resp.data;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.http$) {
      this.http$.unsubscribe();
    }
  }
}
