// page-agenda.component.ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario-diag/formulario.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

// Importa la interfaz desde el servicio
import { AgendaServiceService, FormAmd } from './../../../services/agenda-service.service';
import { SmartwatchService } from '../../../services/smartwatch.service';

import { SmartwatchDetalleComponent } from '../smartwatch_detalle/smart-detalle.component';
import { MatListModule } from '@angular/material/list';
import { SmartwatchComponent } from '../smartwatch/smartwatch.component';


@Component({
  selector: 'app-page-agenda',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    MtxTooltipModule,
    MatTooltipModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
  ],
  providers: [SmartwatchService],
  templateUrl: './page-agenda.component.html',
  styleUrl: './page-agenda.component.scss',
})
export class PageAgendaComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'serial',
    'historico',
    'siis',
    'diagnostico',
    'paciente',
    'razon_consulta',
    'cel_referencia',
    'info_domicilio',
    'cod_ficha',
    'M.A.',
    'finalizado',
  ];
  dataSource: MatTableDataSource<any>;
  buscador = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  datosLista: any;

  constructor(
    private agendaService: AgendaServiceService,
    private smartwatchService: SmartwatchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.funcionListartDatos();
  }

  // page-agenda.component.ts
  funcionListartDatos() {
    this.agendaService.getAgendaList().subscribe(
      (data: FormAmd[]) => {
        this.datosLista = data.map((item: FormAmd, index: number) => ({
          formAmdId: item.formAmdId,
          serial: index + 1,
          age_historia_clinica: 'N/A',
          age_paciente: item.formAmdNombrePaciente || 'No especificado',
          age_razon_consulta: item.formAmdMotivoConsulta || 'No especificado',
          age_celular_referencia: item.formAmdNumReferencia || 'N/A',
          age_info_domicilio: item.formAmdDireccion || 'No especificado',
          age_cod_ficha: this.agendaService.generateFichaCode(), // Generamos código automático
          age_m_a: false,
        }));
        this.dataSource.data = this.datosLista;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
    //this.agendaService.resetFichaCounter();
  }

  async toggleMonitoreo(row: any) {
    if (row.age_m_a) {
      // Desactivar monitoreo
      const confirmacion = confirm(
        `¿Estás seguro que deseas desactivar el monitoreo avanzado para ${row.age_paciente}?`
      );

      if (confirmacion) {
        row.age_m_a = false;
        row.smartwatchId = null;
        console.log('Monitoreo desactivado');
      }
    } else {
      // Activar monitoreo
      try {
        const dispositivos = await this.smartwatchService.getSmartwatches().toPromise();

        if (!dispositivos || dispositivos.length === 0) {
          alert('No hay dispositivos disponibles');
          return;
        }

        const dialogRef = this.dialog.open(SmartwatchComponent, {
          data: { dispositivos },
        });

        const smartwatchId = await dialogRef.afterClosed().toPromise();

        if (smartwatchId) {
          row.age_m_a = true;
          row.smartwatchId = smartwatchId;
          console.log('Dispositivo vinculado:', smartwatchId);
        }
      } catch (error) {
        console.error('Error al obtener dispositivos', error);
        this.mostrarNotificacion('Error al obtener dispositivos', true);
      }
    }
  }

  revisarSmartwatch(row: any): void {
    if (!row.smartwatchId) return;

    this.smartwatchService.getSmartwatchDetails(row.smartwatchId).subscribe({
      next: detalles => {
        this.dialog.open(SmartwatchDetalleComponent, {
          data: detalles,
        });
      },
      error: err => {
        console.error('Error obteniendo detalles', err);
        this.mostrarNotificacion('Error al obtener detalles del dispositivo', true);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirFormulario(): void {
    this.dialog.open(FormularioComponent, {
      width: '650px',
      maxWidth: '95vw',
      panelClass: 'dialogo-formulario',
    });
  }

  // Método de eliminación actualizado
  eliminarRegistro(row: any): void {
    const nombrePaciente = row.age_paciente || 'esta cita';
    const confirmacion = confirm(`¿Eliminar definitivamente la cita de ${nombrePaciente}?`);

    if (confirmacion && row.formAmdId) {
      this.agendaService.deleteAppointment(row.formAmdId).subscribe({
        next: () => {
          this.mostrarNotificacion('Cita eliminada exitosamente');
          this.funcionListartDatos(); // Actualizar tabla
        },
        error: err => {
          console.error('Error eliminando:', err);
          this.mostrarNotificacion('Error al eliminar la cita', true);
        },
      });
    }
  }

  // Método auxiliar para notificaciones
  mostrarNotificacion(mensaje: string, esError: boolean = false): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: esError ? 'snackbar-error' : 'snackbar-success',
    });
  }
}
