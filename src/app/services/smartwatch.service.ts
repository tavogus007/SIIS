import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmartwatchService {
  private apiUrl = `${environment.apiUrl}/smartwatch`;

  constructor(private http: HttpClient) {}

  getSmartwatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSmartwatchDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  unassignDevice(assignmentId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${assignmentId}`);
}
}
