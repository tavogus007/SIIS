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

@Component({
  selector: 'app-page-kardex',
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
    MtxTooltipModule
  ],
  templateUrl: './page-kardex.component.html',
  styleUrl: './page-kardex.component.scss'
})
export class PageKardexComponent implements AfterViewInit {
  displayedColumns: string[] = ['serial', 'historico', 'siis', 'sice', 'tip_reserva', 'fecha_atencion', 'paciente', 'servicio', 'codigo_ficha', 'tip_paciente', 'salida', 'recepcion'];
  dataSource: MatTableDataSource<any>;
  buscador = '';
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  @ViewChild(MatSort) sort: MatSort | any;
  datosLista: any;
  constructor() {
    this.dataSource = new MatTableDataSource();
    this.funcionListarDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  funcionListarDatos() {
    this.datosLista = [{"siis":"1547","sice":"400","tip_reserva":"WEB","fecha_atencion":"12-10-2024","paciente":"Juan Carlos","servicio":"MEDICINA GENERAL","codigo_ficha":"AD - 004","tip_paciente":"INSTITUCIONAL","salida":"NO","recepcion":"NO"},{"siis":"1452","sice":"200","tip_reserva":"HOSPITAL","fecha_atencion":"12-10-2024","paciente":"Luis ariel tarifa Oblitas","servicio":"MEDICINA GENERAL","codigo_ficha":"AD - 002","tip_paciente":"SUS","salida":"SI","recepcion":"SI"}];
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
}