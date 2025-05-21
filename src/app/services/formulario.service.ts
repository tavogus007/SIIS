import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { FormularioComponent } from '../routes/medico_en_tu_casa/formulario-diag/formulario.component';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private dialogRef!: MatDialogRef<FormularioComponent>;

  constructor(private dialog: MatDialog) {}

    abrirDialogo() {
    this.dialogRef = this.dialog.open(FormularioComponent, {
      disableClose: true // Bloquea cierre externo inicialmente
    });

    // Intercepta TODOS los intentos de cierre (botón, clic fuera, ESC)
    this.dialogRef.beforeClosed().subscribe((result) => {
      // Si el cierre no fue iniciado por el botón "Cancelar", muestra confirmación
      if (result !== 'confirmed-by-button') {
        this.mostrarConfirmacionCierre();
        return false; // Cancela el cierre
      }
      return true; // Permite el cierre
    });

    return this.dialogRef;
  }

  private mostrarConfirmacionCierre() {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no se guardarán.')) {
      this.dialogRef.close();
    }
  }
}