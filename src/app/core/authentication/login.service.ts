import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  URL_API = environment.URL_API_LOGIN;
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  requestOptions = { headers: this.headers };
  
  protected readonly http = inject(HttpClient);

  loginAdministracion(body: any): Observable<any> {
    return this.http.post<Token>(this.URL_API, body, this.requestOptions);
  }
  
  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  /*me() {
    return this.http.get<User>('/me');
  }*/

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
