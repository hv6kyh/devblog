import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIError, APISuccess } from '../../shared/constant/DTO';
import { API_URL } from '../../shared/config/config';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}

  getPostList(category: string): Observable<APISuccess | APIError> {
    return this.http.get<APISuccess | APIError>(API_URL + `/post?category=${category}`);
  }

  getPostDetail(postId: string): Observable<APISuccess | APIError> {
    return this.http.get<APISuccess | APIError>(API_URL + `/post/${postId}`);
  }
}
