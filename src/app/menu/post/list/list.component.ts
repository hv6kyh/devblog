import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { PostService } from '../post.service';
import { APISuccess, APIError } from '../../../shared/constant/DTO';
import { PostList } from '../types';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  // for pagination
  p = 1;

  posts: Array<PostList> = [];
  private http$: Subscription;
  private route$: Subscription;
  private currentCategory: string;

  constructor(private readonly postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 만약 스피너가 안 사라지면 사용할것
    // const el = document.getElementById('nb-global-spinner');
    // if (el) {
    //   el.style.display = 'none';
    // }

    this.route$ = this.route.params.subscribe((param) => {
      this.currentCategory = param.ctg;
      this.posts = [];
      this.p = 1;

      this.http$ = this.postService.getPostList(this.currentCategory).subscribe((resp) => {
        if (resp.success) {
          resp = resp as APISuccess;
          if (Array.isArray(resp.data)) {
            resp.data.forEach((el) => {
              this.posts.push(el);
            });
          }
        } else {
          // TODO API에서 값을 못 불러오는 경우에
          // 알러트를 띄우거나 에러 페이지로 이동
          // resp = resp as APIError;
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.http$) {
      this.http$.unsubscribe();
    }
    if (this.route$) {
      this.route$.unsubscribe();
    }
  }

  pageChanged(p: number) {
    console.log('e: ', p);
    this.p = p;
  }
}
