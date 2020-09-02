import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from './../constant/DTO/api.response';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}

  getPostList(): Observable<APIResponse> {
    return this.http.get<APIResponse>('http://localhost:3000/dev/api' + '/post?category=backend');
  }

  getPostDetail(postId: string): Observable<APIResponse> {
    return this.http.get<APIResponse>('http://localhost:3000/dev/api' + `/post/${postId}`);
  }

  // createPost(dto: PostCreate): Observable<PostDetail> {
  //   return this.http.post<PostDetail>(API_URL + '/post', {
  //     title: dto.title,
  //     author: dto.author,
  //     content: dto.content,
  //   });
  // }
}
