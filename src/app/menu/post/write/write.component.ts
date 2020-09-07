import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostCreate } from '../types';

@Component({
  selector: 'ngx-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit {
  createPostForm: FormGroup;
  private currentCategory: string;

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
  }

  get f() {
    return this.createPostForm.controls;
  }

  onSubmit() {
    console.log(this.createPostForm.value);
    const data: PostCreate = { ...this.createPostForm.value };
    data.author = '김영호';
    data.category = this.currentCategory;
    this.postService.createpost(data).subscribe((resp) => {
      if (resp.success) {
        this.location.back();
      }
    });
  }
}
