import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormularioService } from '../../../services/formulario.service';

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
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  
    // Variables para signos vitales con valores iniciales y límites
  frecuenciaCardiaca = { valor: 65, min: 30, max: 200 };
  frecuenciaRespiratoria = { valor: 15, min: 10, max: 60 };
  temperatura = { valor: 20, min: 20, max: 45 }; // Temperatura en °C
  saturacionOxigeno = { valor: 98, min: 70, max: 100 };

  constructor(
    private formularioService: FormularioService,
    public dialogRef: MatDialogRef<FormularioComponent>
  ) {}

   modificarValor(variable: any, operacion: 'sumar' | 'restar') {
    const nuevoValor = operacion === 'sumar' ? variable.valor + 1 : variable.valor - 1;
    variable.valor = Math.min(Math.max(nuevoValor, variable.min), variable.max);
  }

  reiniciarValor(variable: any, valorInicial: number) {
    variable.valor = valorInicial;
  }

  // Métodos específicos para cada variable (mejor legibilidad en template)
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

  // Método básico para cerrar el diálogo
  abrirFormulario() {
    this.formularioService.abrirDialogo();
  }
  cerrar(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no se guardarán.')) {
      this.dialogRef.close('confirmed-by-button');
    }
  }
}
