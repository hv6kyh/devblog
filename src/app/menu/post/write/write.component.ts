import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostCreate, PostUpdate, Post } from '../types';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { Subscription } from 'rxjs';
import { S3Service } from '../../../shared/service/s3.service';

@Component({
  selector: 'ngx-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit, OnDestroy {
  createPostForm: FormGroup;

  private currentCategory: string;
  private post: Post;
  buttonLabel = '작성';

  private token$: Subscription;
  private http$: Subscription;

  private file: File;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly postService: PostService,
    private readonly location: Location,
    private route: ActivatedRoute,
    private readonly nbAuthService: NbAuthService,
    private readonly s3Service: S3Service
  ) {
    this.createPostForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.currentCategory = this.route.snapshot.params.ctg;

    this.post = this.postService.getTmpPost();

    if (this.post) {
      this.buttonLabel = '수정';
      this.createPostForm.setValue({ title: this.post.title, content: this.post.content });
    }
  }

  ngOnDestroy() {
    if (this.token$) {
      this.token$.unsubscribe();
    }
    if (this.http$) {
      this.http$.unsubscribe();
    }
  }

  get f() {
    return this.createPostForm.controls;
  }

  onSubmit() {
    this.token$ = this.nbAuthService.getToken().subscribe((token: NbAuthToken) => {
      // 수정하는 경우랑 신규 작성하는 경우
      if (this.post) {
        const { post_id } = this.post;
        const data: PostUpdate = {
          ...this.createPostForm.value,
        };

        this.http$ = this.postService.updatePost(post_id, data, token.getValue()).subscribe((resp) => {
          if (resp.success) {
            this.postService.flushTmpPost();
            this.location.back();
          }
        });
      } else {
        const data: PostCreate = { ...this.createPostForm.value };
        data.author = token.getPayload().name;
        data.category = this.currentCategory;

        this.http$ = this.postService.createPost(data, token.getValue()).subscribe((resp) => {
          if (resp.success) {
            this.location.back();
          }
        });
      }
    });
  }

  // 본문에 마크다운 형식의 이미지 첨부 라인 추가
  appendLine(str: string) {
    this.createPostForm.patchValue({ content: this.createPostForm.value.content + str });
  }

  async uploadImage(files: FileList) {
    this.file = files.item(0);
    const result: any = await this.s3Service.upload('devblog-images', this.file);
    this.appendLine(`![image](${result.Location})`);
  }
}
