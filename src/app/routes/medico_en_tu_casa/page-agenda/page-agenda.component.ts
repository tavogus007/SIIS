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
import { HttpClientModule } from '@angular/common/http';

// Importa la interfaz desde el servicio
import { AgendaServiceService, FormAmd } from './../../../services/agenda-service.service';

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
    HttpClientModule,
  ],
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
  ];
  dataSource: MatTableDataSource<any>;
  buscador = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  datosLista: any;

  constructor(private agendaService: AgendaServiceService) {
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
          serial: index + 1,
          age_historia_clinica: 'N/A', // No disponible en el endpoint
          age_paciente:
            item.formAmdTipoCiudadano && item.formAmdIdCiudadano
              ? `${item.formAmdTipoCiudadano} - ${item.formAmdIdCiudadano}`
              : 'No especificado',
          age_razon_consulta: item.formAmdMotivoConsulta || 'No especificado',
          age_celular_referencia: item.formAmdNumReferencia || 'N/A',
          age_info_domicilio: item.formAmdDireccion || 'No especificado',
          age_cod_ficha: item.formAmdIdCiudadano || 'N/A',
          age_m_a: false, // Valor por defecto
        }));
        this.dataSource.data = this.datosLista;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  toggleMonitoreo(row: any) {
    row.age_m_a = !row.age_m_a;
    console.log('Estado de monitoreo avanzado:', row.age_m_a);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
