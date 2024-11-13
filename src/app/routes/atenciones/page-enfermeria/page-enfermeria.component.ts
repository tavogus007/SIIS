import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { DatosPacienteComponent } from 'app/routes/componentes/datos-paciente/datos-paciente.component';
import { SignosVitalesComponent } from 'app/routes/componentes/signos-vitales/signos-vitales.component';

@Component({
  selector: 'app-page-enfermeria',
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
    SignosVitalesComponent
  ],
  templateUrl: './page-enfermeria.component.html',
  styleUrl: './page-enfermeria.component.scss'
})
export class PageEnfermeriaComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'serial',
    'estado',
    'siis',
    'sice',
    'fecha_atencion',
    'paciente',
    'servicio',
    'medico',
    'codigo_ficha',
    'tip_paciente',
    'atencion',
    'recepcion_de_kardex',
    'enviado_a_kardex',
  ];
  dataSource: MatTableDataSource<any>;
  buscador = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  datosLista: any;
  opciones: any = 'listadoPacientes';
  estadoAtencion:any;
  constructor() {
    this.dataSource = new MatTableDataSource();
    this.funcionListarPacientesEnfermeria();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  funcionListarPacientesEnfermeria() {
    this.datosLista = [{
      "estado": "SI",
      "siis": "1484",
      "sice": "200",
      "fecha_atencion": "2024-10-17 08:30 - 08:45",
      "paciente": "VIRGINIA QUISBERT ESPEJO",
      "servicio": "CE-CARDIOLOGIA",
      "medico": "MEAVE TORREZ ALEXANDRA MARIA",
      "codigo_ficha": "CA / 002",
      "tip_paciente": "SUS - LEY 1152 ANTIGUO",
      "atencion": "SI",
      "recepcion_de_kardex": "SI",
      "enviado_a_kardex": "NO"
    },
    {
      "estado": "SI",
      "siis": "44323",
      "sice": "411",
      "fecha_atencion": "2024-10-17 08:30 - 08:45",
      "paciente": "ROXANA ARANA DE MIRANDA	",
      "servicio": "CE-GINECOLOGIA OBSTETRICIA",
      "medico": "MEAVE TORREZ ALEXANDRA MARIA",
      "codigo_ficha": "C1-GO / 002",
      "tip_paciente": "INSTITUCIONAL ANTIGUO",
      "atencion": "NO",
      "recepcion_de_kardex": "NO",
      "enviado_a_kardex": "SI"
    }];
    this.dataSource = new MatTableDataSource(this.datosLista);
    this.ngAfterViewInit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  funcionAtender(data:any){
    console.log(data);
    if (data.atencion == 'SI') {
      this.estadoAtencion = true;
    } else {
      this.estadoAtencion = false;
    }
    this.opciones = "signosVitales";
  }

  funcionRegresar(datos: any) {
    this.opciones = 'listadoPacientes'; 
  }
}
