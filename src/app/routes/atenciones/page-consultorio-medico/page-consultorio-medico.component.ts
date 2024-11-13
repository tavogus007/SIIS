import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';
import { ConsultorioConExComponent } from 'app/routes/componentes/consultorio-con-ex/consultorio-con-ex.component';
import { DatosPacienteComponent } from 'app/routes/componentes/datos-paciente/datos-paciente.component';

@Component({
  selector: 'app-page-consultorio-medico',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MtxTooltipModule,
    DatosPacienteComponent,
    ConsultorioConExComponent
  ],
  templateUrl: './page-consultorio-medico.component.html',
  styleUrl: './page-consultorio-medico.component.scss'
})
export class PageConsultorioMedicoComponent {
  displayedColumns: string[] = [
    'serial',
    'atender',
    'siis',
    'sice',
    'tip_paciente',
    'fecha_atencion',
    'paciente',
    'servicio',
    'codigo_ficha',
    'enfermeria'
  ];
  dataSource: MatTableDataSource<any>;
  buscador = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  datosListaConsultorio: any;
  opcion:String = 'listadoPacientesConsultorio';


  constructor() {
    this.dataSource = new MatTableDataSource();
    this.funcionListarPacientesConsultorio();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  funcionListarPacientesConsultorio() {
    this.datosListaConsultorio = [{
      "atender": "SI",
      "siis": "1844",
      "sice": "80458",
      "tip_paciente": "SUS - LEY 1152",
      "fecha_atencion": "2024-10-17, 14:30 - 14:45",
      "paciente": "ESTELA MARIBEL APAZA IQUIAPAZA	",
      "servicio": "CE-CIRUGIA GENERAL",
      "codigo_ficha": "CG/ 002",
      "enfermeria": "SI",
    },
    {
      "atender": "NO",
      "siis": "3434",
      "sice": "345",
      "tip_paciente": "SUS - LEY 1152",
      "fecha_atencion": "2024-10-17, 14:30 - 14:45",
      "paciente": "SULEY EDITH MACHACA YUJRA",
      "servicio": "CE-CIRUGIA GENERAL",
      "codigo_ficha": "CG/ 003",
      "enfermeria": "NO",
    }];
    this.dataSource = new MatTableDataSource(this.datosListaConsultorio);
    this.ngAfterViewInit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  funcionAtenderConsultorio(datos:any){
    this.opcion = 'atencionConsultorio';
  }
}
