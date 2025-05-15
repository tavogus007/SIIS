// agenda-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormAmd {
  formAmdMotivoConsulta: string;
  formAmdNumReferencia: string | null;
  formAmdDireccion: string;
  formAmdTipoCiudadano: string | null;
  formAmdIdCiudadano: string | null; // Corregí el nombre (estaba 'formAmdIdCiudadano')
}

@Injectable({
  providedIn: 'root',
})
export class AgendaServiceService {
  private apiUrl = 'http://172.18.2.144:3000/form-amd';

  constructor(private http: HttpClient) {}

  getAgendaList(): Observable<FormAmd[]> {
    return this.http.get<FormAmd[]>(this.apiUrl);
  }
}