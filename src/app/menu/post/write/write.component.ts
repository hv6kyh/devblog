import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostCreate, PostUpdate, Post } from '../types';

@Component({
  selector: 'ngx-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit {
  createPostForm: FormGroup;

  private currentCategory: string;
  private post: Post;
  buttonLabel = '작성';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly postService: PostService,
    private readonly location: Location,
    private route: ActivatedRoute,
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

  get f() {
    return this.createPostForm.controls;
  }

  onSubmit() {
    console.log(this.createPostForm.value);
    // const data: PostCreate = { ...this.createPostForm.value };
    // data.author = '김영호';
    // data.category = this.currentCategory;

    // 수정하는 경우랑 신규 작성하는 경우
    if (this.post) {
      console.log('수정하는 경우임');

      const { post_id } = this.post;
      const data: PostUpdate = {
        ...this.createPostForm.value,
      };

      this.postService.updatePost(post_id, data).subscribe((resp) => {
        if (resp.success) {
          console.log('수정 요청되었음');
          this.postService.flushTmpPost();
          this.location.back();
        }
      });
    } else {
      console.log('생성하는 경우임');

      const data: PostCreate = { ...this.createPostForm.value };
      data.author = '김영호';
      data.category = this.currentCategory;

      this.postService.createPost(data).subscribe((resp) => {
        if (resp.success) {
          this.location.back();
        }
      });
    }
  }
}
