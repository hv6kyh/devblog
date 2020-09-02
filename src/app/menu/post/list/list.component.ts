import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

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

  constructor(private readonly postService: PostService) { }

  ngOnInit(): void {
    // 만약 스피너가 안 사라지면 사용할것
    // const el = document.getElementById('nb-global-spinner');
    // if (el) {
    //   el.style.display = 'none';
    // }
    this.postService.getPostList().subscribe(resp => {
      if (resp.status === 200 && resp.data) {
        console.log('resp.data: ', resp.data);
        for (let i = 0; i < resp.data.length; i++) {
          this.fruits[i] = resp.data[i]['title'];
        }
      }
    });
  }

  pageChanged(p: number) {
    console.log('e: ', p);
    this.p = p;
  }

}
