import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-detalles-smartwatch-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule, MatDividerModule],
  templateUrl: './smart-detalle.component.html',
  styleUrls: ['./smart-detalle.component.scss'],
})
export class SmartwatchDetalleComponent {
  datos: any;

  constructor(
    public dialogRef: MatDialogRef<SmartwatchDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.datos = data;
  }

  cerrar() {
    this.dialogRef.close();
  }
}
