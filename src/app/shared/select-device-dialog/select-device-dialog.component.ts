import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-select-device-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatListModule, FormsModule],
  templateUrl: './select-device-dialog.component.html',
  styleUrls: ['./select-device-dialog.component.scss'],
})
export class SelectDeviceDialogComponent {
  selectedDevice: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<SelectDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { devices: any[]; patientName: string }
  ) {}

  onAssignClick(): void {
    if (this.selectedDevice) {
      this.dialogRef.close(this.selectedDevice);
    }
  }
}
