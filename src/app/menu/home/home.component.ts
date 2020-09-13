import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { APISuccess } from '../../shared/constant/DTO/success.response';
import { PostService } from '../post/post.service';
import { Post } from '../post/types';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  http$: Subscription;
  post = {
    content: 'hi',
  };

  constructor() {}

  ngOnInit() {}
}
