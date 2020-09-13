import { Component, OnInit, OnDestroy, Inject, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { APISuccess } from '../../shared/constant/DTO/success.response';
import { PostService } from '../post/post.service';
import { Post } from '../post/types';
import { Router, ActivatedRoute } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private http$: Subscription;
  post: Post;
  router: Router = null;
  isAuthenticated = false;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly injector: Injector,
    private readonly nbAuthService: NbAuthService,
  ) {
    this.router = this.injector.get(Router);
  }

  ngOnInit() {
    this.postService.getPostDetail('home').subscribe((resp) => {
      if (resp.success) {
        resp = resp as APISuccess;
        this.post = resp.data;
      }
    });

    this.nbAuthService.isAuthenticated().subscribe((resp) => {
      this.isAuthenticated = resp;
    });
  }

  ngOnDestroy() {
    if (this.http$) {
      this.http$.unsubscribe();
    }
  }

  goToRewrite() {
    this.postService.setTmpPost(this.post);
    this.router.navigate(['../post/tmp/write'], { relativeTo: this.route });
  }
}
