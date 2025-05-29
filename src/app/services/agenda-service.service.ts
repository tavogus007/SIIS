// agenda-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormAmd {
  formAmdId: number;
  formAmdMotivoConsulta: string;
  formAmdNumReferencia: string | null;
  formAmdDireccion: string;
  formAmdTipoCiudadano: string | null;
  formAmdIdCiudadano: string | null;
  formAmdNombrePaciente: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AgendaServiceService {
  private apiUrl = 'http://172.18.2.144:3000/form-amd';
  private lastFichaId = 0;

  constructor(private http: HttpClient) {
    const savedId = localStorage.getItem('lastFichaId');
    this.lastFichaId = savedId ? parseInt(savedId, 10) : 0;
  }

  getAgendaList(): Observable<FormAmd[]> {
    return this.http.get<FormAmd[]>(this.apiUrl);
  }

  generateFichaCode(): string {
    this.lastFichaId++;
    localStorage.setItem('lastFichaId', this.lastFichaId.toString());
    return `FICHA-${this.lastFichaId.toString().padStart(3, '0')}`;
  }
  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   resetFichaCounter(): void {
    this.lastFichaId = 0;
    localStorage.setItem('lastFichaId', '0');
    console.log('Contador de fichas reiniciado a 0');
  }
}
