import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIError, APISuccess } from '../../shared/constant/DTO';
import { API_URL } from 'app/shared/config/config';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly prefix = 'menu';

  constructor(private readonly http: HttpClient) {}

  public getmenuList(): Observable<APISuccess | APIError> {
    return this.http.get<APISuccess | APIError>(API_URL + `/${this.prefix}`);
  }
}
