import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartwatchService {
  private apiUrl = 'http://172.18.2.144:3000/smartwatch';

  constructor(private http: HttpClient) {}

  getSmartwatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSmartwatchDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}