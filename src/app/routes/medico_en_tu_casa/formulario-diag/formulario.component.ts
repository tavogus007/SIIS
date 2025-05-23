import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FormDiagnostico, FormularioService } from '../../../services/formulario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'formulario',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  frecuenciaCardiaca = { valor: 65, min: 30, max: 170 };
  frecuenciaRespiratoria = { valor: 15, min: 10, max: 60 };
  temperatura = { valor: 30, min: 20, max: 45 };
  saturacionOxigeno = { valor: 98, min: 70, max: 100 };
  presionArterial = {
    sistolica: 115,
    diastolica: 75,
  };
  editandoSistolica = false;
  editandoDiastolica = false;

  opcionesMedicamentos = ['Ibuprofeno', 'Paracetamol', 'Omeprazol', 'Atorvastatina', 'Sildenafil'];

  opcionesPresentacion = [
    'Tableta 400mg',
    'Cápsula 20mg',
    'Suspensión 100mg/5ml',
    'Tableta 500mg',
    'Tableta 50mg',
  ];

  opcionesCantidad = ['1 unidad', '2 unidades', '5 unidades', '10 unidades', '20 unidades'];

  opcionesPosologia = [
    'Cada 8 horas',
    'Cada 12 horas',
    'Una vez al día',
    'Cada 6 horas',
    'Cada 24 horas',
  ];

  medicamentoSeleccionado = '';
  presentacionSeleccionada = '';
  cantidadSeleccionada = '';
  posologiaSeleccionada = '';

  diagnosticoPresuntivo: string = '';
  notasAdicionales: string = '';

  intentoEnvio: boolean = false;
  http: any;

  constructor(
    private formularioService: FormularioService,
    public dialogRef: MatDialogRef<FormularioComponent>
  ) {}

  get formularioValido(): boolean {
    return !!(
      this.diagnosticoPresuntivo?.trim() &&
      this.medicamentoSeleccionado &&
      this.presentacionSeleccionada &&
      this.cantidadSeleccionada &&
      this.posologiaSeleccionada
    );
  }

  modificarValor(variable: any, operacion: 'sumar' | 'restar') {
    const nuevoValor = operacion === 'sumar' ? variable.valor + 1 : variable.valor - 1;
    variable.valor = Math.min(Math.max(nuevoValor, variable.min), variable.max);
  }

  reiniciarValor(variable: any, valorInicial: number) {
    variable.valor = valorInicial;
  }

  modificarFC(operacion: 'sumar' | 'restar') {
    this.modificarValor(this.frecuenciaCardiaca, operacion);
  }

  reiniciarFC() {
    this.reiniciarValor(this.frecuenciaCardiaca, 65);
  }

  modificarFR(operacion: 'sumar' | 'restar') {
    this.modificarValor(this.frecuenciaRespiratoria, operacion);
  }

  reiniciarFR() {
    this.reiniciarValor(this.frecuenciaRespiratoria, 15);
  }

  modificarTemp(operacion: 'sumar' | 'restar') {
    this.modificarValor(this.temperatura, operacion);
  }

  reiniciarTemp() {
    this.reiniciarValor(this.temperatura, 20);
  }

  modificarSpO2(operacion: 'sumar' | 'restar') {
    this.modificarValor(this.saturacionOxigeno, operacion);
  }

  reiniciarSpO2() {
    this.reiniciarValor(this.saturacionOxigeno, 98);
  }

  editarSistolica() {
    this.editandoSistolica = true;
  }

  editarDiastolica() {
    this.editandoDiastolica = true;
  }

  guardarPresion(tipo: 'sistolica' | 'diastolica') {
    if (tipo === 'sistolica') {
      this.editandoSistolica = false;
    } else {
      this.editandoDiastolica = false;
    }
  }

  abrirFormulario() {
    this.formularioService.abrirDialogo();
  }
  cerrar(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no se guardarán.')) {
      this.dialogRef.close('confirmed-by-button');
    }
  }

  finalizarEvaluacion() {
    this.intentoEnvio = true;

    if (!this.formularioValido) {
      this.scrollToFirstError();
      alert('Por favor complete todos los campos requeridos');
      return;
    }

     const doctorId = 3;

    // Preparar los datos con valores por defecto para evitar undefined
    const formData: FormDiagnostico = {
      doctor: { persona_id: doctorId },
      frec_cardica: this.frecuenciaCardiaca.valor || 0,
      formDiagnosticoPresArterial: `${this.presionArterial.sistolica || 0}/${this.presionArterial.diastolica || 0}`,
      formDiagnosticoFrecRespiratoria: this.frecuenciaRespiratoria.valor || 0,
      formDiagnosticoTemperatura: this.temperatura.valor || 0,
      formDiagnosticoSaturacionOxigeno: this.saturacionOxigeno.valor || 0,
      formDiagnosticoDiagnosticoPresuntivo: this.diagnosticoPresuntivo?.trim() || '',
      formDiagnosticoNombreMedicamento: this.medicamentoSeleccionado || '',
      formDiagnosticoPresentacionMedicamento: this.presentacionSeleccionada || '',
      formDiagnosticoCantidadMedicamento: this.extraerNumero(this.cantidadSeleccionada) || 0,
      formDiagnosticoPosologia: this.posologiaSeleccionada || '',
      formDiagnosticoNotasAdicionales: this.notasAdicionales || '',
    };

    console.log('Datos a enviar:', formData);

    this.formularioService.guardarDiagnostico(formData).subscribe({
      next: response => {
        console.log('Respuesta del servidor:', response);
        this.manejarExito(response);
      },
      error: err => {
        console.error('Error completo:', err);
        this.manejarError(err);
      },
      complete: () => {
        this.dialogRef.close('confirmed-by-button');
      },
    });
  }

  private scrollToFirstError(): void {
    const firstErrorElement = document.querySelector('.error-message');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private extraerNumero(cantidad: string): number {
    return parseInt(cantidad.replace(/\D/g, ''), 10) || 0;
  }
  manejarExito(respuesta: FormDiagnostico) {
    alert('Diagnóstico guardado exitosamente');
    console.log('Diagnóstico guardado exitosamente');
  }

  private manejarError(err: any): void {
    console.error('Error detallado:', err);
    const errorMessage = err.error?.message || err.message;
    alert(`Error al guardar: ${errorMessage}`);
  }

  guardarDiagnostico(formData: FormDiagnostico): Observable<any> {
    // Replace the URL with your backend endpoint
    return this.http.post('/form-diagnostico', formData);
  }
}

