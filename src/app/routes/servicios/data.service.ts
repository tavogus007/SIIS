import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  urlBase = "http://localhost:8080/wsHos";
  constructor(private http: HttpClient) {}

  dinamico(consulta: any): Observable<any> {
    return this.http.post<any>(
      this.urlBase+'/dinamico',
      consulta);
  }
}
