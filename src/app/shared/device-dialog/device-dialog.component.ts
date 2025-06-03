import { NgModule } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-assign-device-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss'],
})
export class AssignDeviceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AssignDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientName: string }
  ) {}
}
