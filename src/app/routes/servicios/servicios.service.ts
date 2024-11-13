import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  urlBase = "http://localhost:8080/wsHos";
  constructor(private http: HttpClient) {}
  dataFichas:any=[];
  dinamico(consulta: any): Observable<any> {
    return this.http.post<any>(
      this.urlBase+'/dinamico',
      consulta);
  }

  addPushSubscriber(token:any) {
    return this.http.post<any>(this.urlBase,token);
  };
}
