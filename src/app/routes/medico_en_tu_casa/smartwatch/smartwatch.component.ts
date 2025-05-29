import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-seleccionar-smartwatch-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule],
  templateUrl: './smartwatch.component.html',
  styleUrls: ['./smartwatch.component.scss'],
})
export class SmartwatchComponent {
  dispositivos: any[] = [];
  dispositivoSeleccionado: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<SmartwatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dispositivos = data.dispositivos;
  }

  seleccionar() {
    this.dialogRef.close(this.dispositivoSeleccionado);
  }

  cancelar() {
    this.dialogRef.close();
  }
}