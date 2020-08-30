import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  p = 1;

  fruits = [
    'Lemons',
    'Raspberries',
    'Strawberries',
    'Blackberries',
    'Kiwis',
    'Grapefruit',
    'Avocado',
    'Watermelon',
    'Cantaloupe',
    'Oranges',
    'Peaches',
  ];

  constructor() { }

  ngOnInit(): void {
    // 만약 스피너가 안 사라지면 사용할것
    // const el = document.getElementById('nb-global-spinner');
    // if (el) {
    //   el.style.display = 'none';
    // }
  }

  pageChanged(p: number) {
    console.log('e: ', p);
    this.p = p;
  }

}
