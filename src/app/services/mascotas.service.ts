import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timestamp } from 'typeorm';

// Interfaz para el modelo de las mascotas
export interface Mascota {
  id: number;
  informacion: string;
  tiempo: Timestamp;
}

@Injectable({
  providedIn: 'root', // No necesitas importar este servicio en otro lugar
})
export class MascotasService {
  private apiUrl = 'http://localhost:5000/api/codigo';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de mascotas
  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl);
  }

  // Método para iniciar el escaneo del código de barras
  scanBarcode(): Observable<any> {
    return this.http.post(`${this.apiUrl}/scan`, {});
  }
}
