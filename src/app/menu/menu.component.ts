import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menu = [
    {
      title: 'post',
      icon: 'layout-outline',
      link: '/post',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
