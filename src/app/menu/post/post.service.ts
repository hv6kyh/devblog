import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIError, APISuccess } from '../../shared/constant/DTO';
import { API_URL } from '../../shared/config/config';
import { PostCreate } from './types';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly prefix = 'post';

  constructor(private readonly http: HttpClient) {}

  getPostList(category: string): Observable<APISuccess | APIError> {
    return this.http.get<APISuccess | APIError>(API_URL + `/${this.prefix}?category=${category}`);
  }

  getPostDetail(postId: string): Observable<APISuccess | APIError> {
    return this.http.get<APISuccess | APIError>(API_URL + `/${this.prefix}/${postId}`);
  }

  createpost(dto: PostCreate): Observable<APISuccess | APIError> {
    return this.http.post<APISuccess | APIError>(API_URL + `/${this.prefix}`, dto);
  }
}
