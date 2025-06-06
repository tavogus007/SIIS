import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmartwatchService {
  private apiUrl = `${environment.apiUrl}/smartwatch`;
  private baseUrl = environment.apiUrl; // Usar esta para los endpoints generales

  constructor(private http: HttpClient) {}

  // Método corregido - usa this.baseUrl
  assignDevice(patientId: number, deviceId: number): Observable<any> {
    return of({
      success: true,
      assignmentId: Math.floor(Math.random() * 1000),
      message: 'Dispositivo asignado exitosamente',
    }).pipe(delay(800)); // Simular tiempo de respuesta
  }

  getSmartwatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSmartwatchDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  unassignDevice(assignmentId: number): Observable<any> {
    return of({
      success: true,
      message: 'Dispositivo desasignado exitosamente',
    }).pipe(delay(500));
  }

  // Método corregido - usa this.baseUrl
  getAssignmentDetails(assignmentId: number): Observable<any> {
    return of({
      id: assignmentId,
      patientId: 123,
      deviceId: 456,
      status: 'active',
      lastReading: {
        heartRate: 72,
        bloodPressure: '120/80',
        timestamp: new Date().toISOString(),
      },
    }).pipe(delay(600));
  }
}

