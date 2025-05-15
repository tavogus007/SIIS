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
import { Mascota, MascotasService } from '../../services/mascotas.service';


@Component({
  selector: 'app-page-kardexs',
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
  ],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent implements AfterViewInit {
  displayedColumns: string[] = ['serial','id','informacion','tiempo'];
  dataSource: MatTableDataSource<any>;
  buscador = '';
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  @ViewChild(MatSort) sort: MatSort | any;
  datosLista: any;

  constructor(private mascotasService: MascotasService) {
    this.dataSource = new MatTableDataSource();
    this.funcionListarDatos();
  }
  
  registrarMascota() {
    this.mascotasService.scanBarcode().subscribe(
      (response) => {
        console.log('Código escaneado:', response.result);
        // Aquí puedes manejar el resultado (por ejemplo, mostrarlo en la interfaz)
      },
      (error) => {
        console.error('Error al escanear el código de barras', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  funcionListarDatos() {
    this.mascotasService.getMascotas().subscribe({
      next: (data: Mascota[]) => {
        this.datosLista = data; // Los datos obtenidos del backend
        this.dataSource = new MatTableDataSource(this.datosLista);
        this.ngAfterViewInit(); // Reconfigura paginación y ordenamiento
      },
      error: (err) => {
        console.error('Error al cargar datos de mascotas:', err);
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
}