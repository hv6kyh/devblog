import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService, NbWindowService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from '../../../@core/utils';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { UserPayload } from '../../../shared/constant/types';
import { DonationComponent } from '../../../menu/other/donation/donation.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  // userPictureOnly: boolean = false;
  // user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Log out', link: '/auth/login' }];

  user: UserPayload;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private nbAuthService: NbAuthService,
    private readonly nbWindowService: NbWindowService,
  ) {}
  // private breakpointService: NbMediaBreakpointsService,

  ngOnInit() {
    this.themeService.changeTheme('corporate');
    // this.currentTheme = this.themeService.currentTheme;

    // this.userService
    //   .getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => (this.user = users.youngho));

    this.nbAuthService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
          console.log('토큰 유저: ', this.user);

          // 유효하게 로그인된 상태라고 가정
          console.log('로그인됨');
          this.userMenu = [{ title: 'Log out', link: '/auth/logout' }];
        } else {
          console.log('로그아웃됨');
          this.userMenu = [{ title: 'Log in', link: '/auth/login' }];
        }
      });

    // const { xl } = this.breakpointService.getBreakpointsMap();
    // this.themeService
    //   .onMediaQueryChange()
    //   .pipe(
    //     map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl));

    // this.themeService
    //   .onThemeChange()
    //   .pipe(
    //     map(({ name }) => name),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  openWindow() {
    this.nbWindowService.open(DonationComponent, { title: '기부하기' });
  }
}
