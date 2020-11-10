import { Component, OnInit, OnDestroy, Injector, AfterViewChecked } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APISuccess } from '../../../shared/constant/DTO/success.response';
import { Post } from '../types';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  private postId: string;
  post: Post = null;

  private http$: Subscription;
  public router: Router = null;
  loadFinish = false;

  imageEventFlag: boolean;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly injector: Injector,
    private readonly markdownService: MarkdownService,
  ) {
    this.router = this.injector.get(Router);
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.post_id;

    this.http$ = this.postService.getPostDetail(this.postId).subscribe((resp) => {
      if (resp.success) {
        resp = resp as APISuccess;
        this.post = resp.data;
        this.loadFinish = true;
        console.log('디테일 this.post: ', this.post);
      }
    });

    // image 렌더러를 수정해서 width 속성 부여함
    // 화면에 꽉차게
    this.markdownService.renderer.image = (href: string, title: string, text: string) =>
      `
        <img class="image" src="${href}" alt="${text}" width="100%">
      `;

    this.imageEventFlag = false;
  }

  ngAfterViewChecked(): void {
    if (!this.imageEventFlag) {
      // 클래스로 element 찾음
      const images = document.getElementsByClassName('image');

      if (images.length) {
        Array.from(images).forEach((el: HTMLImageElement) => {
          // 순회하며 클릭 이벤트 부여
          if (!el.onclick) {
            if (el.width > el.naturalWidth) {
              el.width = el.naturalWidth;
            }
            el.onclick = () => {
              if (el.width === el.naturalWidth) {
                el.setAttribute('width', '100%');
              } else {
                el.width = el.naturalWidth;
              }
            };
          }
        });
        this.imageEventFlag = true;
      }
    }
  }

  ngOnDestroy() {
    if (this.http$) {
      this.http$.unsubscribe();
    }
  }

  goToRewrite() {
    this.postService.setTmpPost(this.post);
    this.router.navigate(['../write'], { relativeTo: this.route });
  }
}
