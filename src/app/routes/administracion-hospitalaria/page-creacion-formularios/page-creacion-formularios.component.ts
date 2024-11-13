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
import { OptionFormComponent } from 'app/routes/componentes/option-form/option-form.component';
import { RenderFormComponent } from 'app/routes/componentes/render-form/render-form.component';

@Component({
  selector: 'app-page-creacion-formularios',
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
    RenderFormComponent,
    OptionFormComponent
  ],
  templateUrl: './page-creacion-formularios.component.html',
  styleUrl: './page-creacion-formularios.component.scss'
})
export class PageCreacionFormulariosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'serial',
    'desc_from',
    'opciones',
  ];
  //dataSource: MatTableDataSource<any>;
  dataSource: any = [];
  buscador = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  datosLista: any;
  opcion:String = 'listarFormularios';


  ngAfterViewInit() {
    this.funcionListarDatosFormulario();
  }

  funcionListarDatosFormulario() {
    this.dataSource = [
      { serial: 1, desc_from: 'FORMULARIO DE MEDICINA GENERAL' },
      { serial: 2, desc_from: 'FORMULARIO DE MEDICINA INTERNA' },
      { serial: 3, desc_from: 'FORMULARIO DE ODONTOLOGIA' },
      { serial: 4, desc_from: 'FORMULARIO DE FISIOTERAPIA' },
      { serial: 5, desc_from: 'FORMULARIO DE PEDIATRIA' },
    ];
  }

  funcionEditar(datos: any) {
    console.log(datos);
    this.opcion = 'editarformulario';
  }

}
