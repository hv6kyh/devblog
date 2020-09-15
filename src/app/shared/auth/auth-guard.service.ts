import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private readonly nbAuthService: NbAuthService, private readonly nbToastrService: NbToastrService) {}

  canActivate() {
    return this.nbAuthService.isAuthenticated().pipe(
      tap((authenticated) => {
        if (!authenticated) {
          this.nbToastrService.show('로그인을 해주세요.', '알림');
        }
      }),
    );
  }
}
