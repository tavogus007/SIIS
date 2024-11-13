import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BuscadorPacientesComponent } from '../../componentes/buscador-pacientes/buscador-pacientes.component';
import { FormularioPacienteComponent } from '../../componentes/formulario-paciente/formulario-paciente.component';
import { DatosPacienteComponent } from 'app/routes/componentes/datos-paciente/datos-paciente.component';
import { CommonModule } from '@angular/common';
import { ReservarFichaComponent } from 'app/routes/componentes/reservar-ficha/reservar-ficha.component';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-page-admision',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatTooltipModule,
    BuscadorPacientesComponent,
    FormularioPacienteComponent,
    DatosPacienteComponent,
    ReservarFichaComponent,
    MatMenuModule
  ],
  templateUrl: './page-admision.component.html',
  styleUrl: './page-admision.component.scss'
})
export class PageAdmisionComponent implements OnInit {
  opciones: String = '';
  opcionesReserva: String = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    { position: 1, name: '13-08-2024', weight: 'ADMISION', symbol: 'AD - 2' },
    { position: 2, name: '13-08-2024', weight: 'ADMISION', symbol: 'AD - 3' },
    { position: 3, name: '13-08-2024', weight: 'CAJAS', symbol: 'CA - 2' },
    { position: 4, name: '13-08-2024', weight: 'ADMISION', symbol: 'AD - 4' },
  ];
  displayedColumns2: string[] = ['dtspsl_ci', 'dtspsl_nombres', 'dtspsl_paterno', 'dtspsl_materno'];
  dataSource2: any = [];
  dataPaciente: any = [];
  tipoAtencion: any;
  tamanioForm: String = '';
  classStyleIinf: String = '';
  classStyleRes: String = '';
  constructor() {
    this.opciones = 'atencionFichas';
    this.opcionesReserva = 'mostrarServicios';
    this.tamanioForm = 'M';
    this.classStyleIinf = 'col-md-12';
    this.classStyleRes = 'col-md-12';
  }
  ngOnInit(): void {
  }

  funcionBuscarPaciente(data: any) {
    this.opciones = 'busquedaPacientes';
    this.tipoAtencion = 'CE';
  }

  funcionAtender() {
    this.opciones = 'busquedaPacientes';
    this.tipoAtencion = 'CE';
  }

  funcionAtenderFichasEM() {
    this.opciones = 'busquedaPacientes';
    this.tipoAtencion = 'EM';
  }

  funcionAtenderFichasHE() {
    this.opciones = 'busquedaPacientes';
    this.tipoAtencion = 'HE';
  }

  funcionRegresar(datos: any) {
    console.log(datos);
    this.opciones = 'busquedaPacientes';
    
  }

  funcionRecuperarDatos(data: any) {
    console.log("data", data);
    this.dataSource2 = data;

    /*this.dataPaciente = data;
    this.funcionAtender(data);*/
  }

  funcionLimpiarBusqueda(){
    this.dataSource2 = [];
  }

  funcionPendienteFicha() {
    this.opciones = 'atencionFichas';
    this.funcionLimpiarBusqueda();
  }

  funcionRealizarAtencion(data:any){
    console.log(data);
    this.dataPaciente = data;
    this.opciones = "datosPersonales";
  }

  funcionCrearNuevoPaciente(){
    this.opciones = "datosPersonales";
  }

  funcionReservarFicha(datos:any){
    console.log("8888",datos);
    this.opciones = "reservarServicio";
  }

  funcionVolverBusqueda() {
    this.opciones = 'busquedaPacientes';
  }

  funcionVolverServicios() {
    //this.opciones = 'busquedaPacientes';
    this.opcionesReserva = 'mostrarServicios';
    this.tamanioForm = 'M';
    this.classStyleIinf = 'col-md-12';
    this.classStyleRes = 'col-md-12';
  }

  funcionMostrarEspecialidades(){
    this.opcionesReserva = 'mostrarEspecialidades';
    this.tamanioForm = 'S';
    this.classStyleIinf = 'col-md-3';
    this.classStyleRes = 'col-md-9';
  }
}
