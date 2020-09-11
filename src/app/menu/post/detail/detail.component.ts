import { Component, OnInit, OnDestroy, Injector, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APISuccess } from '../../../shared/constant/DTO/success.response';
import { Post } from '../types';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private postId: string;
  post: Post = null;

  private http$: Subscription;
  public router: Router = null;
  loadFinish = false;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly injector: Injector,
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
  }

  ngOnDestroy() {
    if (this.http$) {
      this.http$.unsubscribe();
    }
  }

  goToRewrite() {
    this.postService.setTmpPost(this.post);
    this.router.navigate(['../write'], { relativeTo: this.route, queryParams: { postId: this.postId } });
  }
}
