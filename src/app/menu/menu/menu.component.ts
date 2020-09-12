import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APISuccess } from '../../shared/constant/DTO';
import { MenuService } from './menu.service';
import { NbMenuItem } from '@nebular/theme';

interface Menu {
  title: string;
  icon: string;
  children: [
    {
      title: string;
      link: string;
    },
  ];
}

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly prefix = 'menu';
  // menus: Menu[] = [];
  menus: NbMenuItem[] = [];
  private http$: Subscription;

  constructor(private readonly menuService: MenuService) {}

  ngOnInit(): void {
    this.http$ = this.menuService.getmenuList().subscribe((resp) => {
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
