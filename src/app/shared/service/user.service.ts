import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APISuccess, APIError } from '../constant/DTO';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly prefix = 'user';

  constructor(private readonly http: HttpClient) {}

  requestSignin(signInfo): Observable<APISuccess | APIError> {
    return this.http.post<APISuccess | APIError>(API_URL + `/${this.prefix}signin`, signInfo);
  }
}
