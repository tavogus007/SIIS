import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormularioComponent } from '../routes/medico_en_tu_casa/formulario-diag/formulario.component';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface FormDiagnostico {
  doctor: { persona_id: number };
  frec_cardica: number | null;
  formDiagnosticoPresArterial: string;
  formDiagnosticoFrecRespiratoria: number;
  formDiagnosticoTemperatura: number;
  formDiagnosticoSaturacionOxigeno: number;
  formDiagnosticoDiagnosticoPresuntivo: string;
  formDiagnosticoNombreMedicamento: string;
  formDiagnosticoPresentacionMedicamento: string;
  formDiagnosticoCantidadMedicamento: number;
  formDiagnosticoPosologia: string;
  formDiagnosticoNotasAdicionales: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private apiUrl = 'http://172.18.2.144:3000/form-diagnostico';
  private dialogRef!: MatDialogRef<FormularioComponent>;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  guardarDiagnostico(formData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  return this.http.post(this.apiUrl, formData, { headers }).pipe(
    catchError(error => {
      console.error('Error completo:', error);
      if (error.error instanceof ErrorEvent) {
        console.error('Error del cliente:', error.error.message);
      } else {
        console.error(`Código de error: ${error.status}, cuerpo:`, error.error);
      }
      return throwError('Ocurrió un error al guardar');
    })
  );
}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage += `\nDetalles: ${error.error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  abrirDialogo() {
    this.dialogRef = this.dialog.open(FormularioComponent, {
      disableClose: true,
      width: '1200px',
      panelClass: 'dialogo-ancho',
    });

    this.dialogRef.beforeClosed().subscribe(result => {
      if (result !== 'confirmed-by-button') {
        this.mostrarConfirmacionCierre();
        return false;
      }
      return true;
    });

    return this.dialogRef;
  }

  guardarDatos(datos: any): Observable<any> {
    const payload = {
      formDiagnosticoFrecCardiaca: datos.frecuenciaCardiaca || null,
      formDiagnosticoPresArterial: datos.presionArterial || null,
      formDiagnosticoFrecRespiratoria: datos.frecuenciaRespiratoria || null,
      formDiagnosticoTemperatura: datos.temperatura,
      formDiagnosticoSaturacionOxigeno: datos.saturacionOxigeno || null,
      formDiagnosticoDiagnosticoPresuntivo: datos.diagnostico || null,
      formDiagnosticoNombreMedicamento: datos.medicamento || null,
      formDiagnosticoPresentacionMedicamento: datos.presentacion || null,
      formDiagnosticoCantidadMedicamento: datos.cantidad || null,
      formDiagnosticoPosologia: datos.posologia || null,
      formDiagnosticoNotasAdicionales: datos.notas || null,
    };

    return this.http.post(this.apiUrl, payload);
  }

  private mostrarConfirmacionCierre() {
    if (confirm('¿Estás seguro de cancelar? Los cambios no se guardarán.')) {
      this.dialogRef.close();
    }
  }
}
