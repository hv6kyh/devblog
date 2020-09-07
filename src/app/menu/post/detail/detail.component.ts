import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { APISuccess } from '../../../shared/constant/DTO/success.response';
import { Post } from '../types';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, OnDestroy {
  private postId: string;
  post: Post = null;
  str: string;

  private http$: Subscription;

  constructor(private readonly postService: PostService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.post_id;

    this.http$ = this.postService.getPostDetail(this.postId).subscribe((resp) => {
      console.log('디테일 resp: ', resp);

      if (resp.success) {
        resp = resp as APISuccess;
        this.post = resp.data;
        console.log('디테일 this.post: ', this.post);
      }
    });

    this.str = '텍스트';
  }

  ngOnDestroy() {
    if (this.http$) {
      this.http$.unsubscribe();
    }
  }
}
