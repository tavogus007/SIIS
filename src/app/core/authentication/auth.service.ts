import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, iif, map, merge, of, share, switchMap, tap } from 'rxjs';
import { filterObject, isEmptyObject } from './helpers';
import { User } from './interface';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { MenuService } from '@core/bootstrap/menu.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginService = inject(LoginService);
  private readonly tokenService = inject(TokenService);

  responde: any;
  key: any = "menu";
  ready: any = [];

  constructor(
    private menuService: MenuService,
  ) {
    this.ready = sessionStorage.getItem(this.key);
    this.menuService.set(JSON.parse(this.ready));
  }

  private user$ = new BehaviorSubject<User>({});
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    //switchMap(() => this.assignUser()),
    share()
  );

  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  change() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }

  login(username: string, password: string, rememberMe = false) {
    return this.loginService.login(username, password, rememberMe).pipe(
      tap(token => this.tokenService.set(token)),
      map(() => this.check())
    );
  }

  setGenericStorage(name:any, data:any){
    sessionStorage.setItem(name, data);
    //localStorage.setItem(name, data);
  }
  setGenericSession(name:any, data:any){
    sessionStorage.setItem(name, data);
  }

  setMenuStorage(data:any){
    sessionStorage.setItem(this.key, JSON.stringify(data));
    this.menuService.set(data);
  }
  setDataStorage(data:any){
    this.tokenService.storageData(data);
  }
  storageToken(data:any){
    this.tokenService.storageToken(data);
  }

  loginAdministracion(username: string, password: string,data: any) {
    return this.loginService.loginAdministracion(data);
  }

  refresh() {
    return this.loginService
      .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(undefined)),
        tap(token => this.tokenService.set(token)),
        map(() => this.check())
      );
  }

  logout() {
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }

  removeStorage(key:string){
    this.tokenService.removeStorage(key);
    sessionStorage.removeItem(key);
  }
  removeSession(key:string){
    this.tokenService.removeStorage(key);
    sessionStorage.removeItem(key);
  }

  /*private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }

    return this.loginService.me().pipe(tap(user => this.user$.next(user)));
  }*/
}
