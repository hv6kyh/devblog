import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIError, APISuccess } from '../../shared/constant/DTO';
import { API_URL } from '../../shared/config/config';
import { PostCreate, Post, PostUpdate } from './types';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly prefix = 'post';

  // 글 상세 페이지의 정보를 수정 페이지에 옮기기 위해 사용함
  // 디비에서 가져오면 자원 아까움
  private tmpPost: Post;

  constructor(private readonly http: HttpClient) {}

  getPostList(category: string): Observable<APISuccess | APIError> {
    return this.http.get<APISuccess | APIError>(API_URL + `/${this.prefix}?category=${category}`);
  }

  getPostDetail(postId: string): Observable<APISuccess | APIError> {
    return this.http.get<APISuccess | APIError>(API_URL + `/${this.prefix}/${postId}`);
  }

  createPost(dto: PostCreate): Observable<APISuccess | APIError> {
    return this.http.post<APISuccess | APIError>(API_URL + `/${this.prefix}`, dto);
  }

  updatePost(postId: string, dto: PostUpdate): Observable<APISuccess | APIError> {
    return this.http.put<APISuccess | APIError>(API_URL + `/${this.prefix}/${postId}`, dto);
  }

  public setTmpPost(post: Post) {
    this.tmpPost = post;
  }

  public getTmpPost(): Post {
    return this.tmpPost;
  }

  public flushTmpPost() {
    this.tmpPost = null;
  }
}
