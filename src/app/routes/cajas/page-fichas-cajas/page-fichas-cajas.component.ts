import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';
import { DialogHabilitacionFichaComponent } from './dialog-habilitacion-ficha/dialog-habilitacion-ficha.component';
@Component({
  selector: 'app-page-fichas-cajas',
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
  templateUrl: './page-fichas-cajas.component.html',
  styleUrl: './page-fichas-cajas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFichasCajasComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'serial',
    'hc_siis',
    'hc_sice',
    'fecha_registro',
    'fecha_atencion',
    'paciente',
    'ficha_origen',
    'servicio',
    'codigo_ficha',
    'tipo_consulta',
    'habilitacion',
  ];
  dataSource: MatTableDataSource<any>;
  buscador = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  datosLista: any;

  readonly dialog = inject(MatDialog);
  
  constructor() {
    this.dataSource = new MatTableDataSource();
    this.funcionListarFichas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  funcionListarFichas() {
    this.datosLista = [{ 
      "hc_siis":"14548",
      "hc_sice":"200",
      "fecha_registro":"2024-10-17 08:56:20",
      "fecha_atencion":"2024-10-19 09:45 - 10:00",
      "paciente":"MAYA ISABELA SILVA PINTO",
      "ficha_origen":"ADMISIONES",
      "servicio":"CONSULTA PEDIATRIA",
      "codigo_ficha":"C1-PE / 004	",
      "tipo_consulta":"CONSULTA",
      "habilitacion":"",
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogHabilitacionFichaComponent, {
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
