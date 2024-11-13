import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MtxAlertModule } from '@ng-matero/extensions/alert';

@Component({
  selector: 'app-dialog-habilitacion-ficha',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MtxAlertModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './dialog-habilitacion-ficha.component.html',
  styleUrl: './dialog-habilitacion-ficha.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHabilitacionFichaComponent {
  readonly dialogRef = inject(MatDialogRef<DialogHabilitacionFichaComponent>);
}
