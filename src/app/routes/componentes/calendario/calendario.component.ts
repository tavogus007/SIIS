import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MtxPopoverModule, MtxPopoverPositionEnd, MtxPopoverPositionStart } from '@ng-matero/extensions/popover';
//import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    MtxPopoverModule,
    MatChipsModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit {
  
  positionStart: MtxPopoverPositionStart = 'after';
  positionEnd: MtxPopoverPositionEnd = 'below';
  xOffset = 0;
  yOffset = 0;
  closeOnPanelClick = false;
  calendario: any = [];
  fechaFichas: any = [];
  enterDelay = 200;
  leaveDelay = 200;
  @Output() nextSteper = new EventEmitter();

  ngOnInit(): void {
    this.calendario = [{"semana":[{"dia":1,"fecha_dia":1,"fecha_literal":"DOMINGO 01 SETIEMBRE DEL 2024","literal_dia":"DOMINGO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-01"},{"dia":2,"fecha_dia":2,"fecha_literal":"LUNES 02 SETIEMBRE DEL 2024","literal_dia":"LUNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-02"},{"dia":3,"fecha_dia":3,"fecha_literal":"MARTES 03 SETIEMBRE DEL 2024","literal_dia":"MARTES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-03"},{"dia":4,"fecha_dia":4,"fecha_literal":"MIERCOLES 04 SETIEMBRE DEL 2024","literal_dia":"MIERCOLES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-04"},{"dia":5,"fecha_dia":5,"fecha_literal":"JUEVES 05 SETIEMBRE DEL 2024","literal_dia":"JUEVES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-05"},{"dia":6,"fecha_dia":6,"fecha_literal":"VIERNES 06 SETIEMBRE DEL 2024","literal_dia":"VIERNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-06"},{"dia":7,"fecha_dia":7,"fecha_literal":"SABADO 07 SETIEMBRE DEL 2024","literal_dia":"SABADO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-07"}]},{"semana":[{"dia":1,"fecha_dia":8,"fecha_literal":"DOMINGO 08 SETIEMBRE DEL 2024","literal_dia":"DOMINGO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-08"},{"dia":2,"fecha_dia":9,"fecha_literal":"LUNES 09 SETIEMBRE DEL 2024","literal_dia":"LUNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-09"},{"dia":3,"fecha_dia":10,"fecha_literal":"MARTES 10 SETIEMBRE DEL 2024","literal_dia":"MARTES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-10"},{"dia":4,"fecha_dia":11,"fecha_literal":"MIERCOLES 11 SETIEMBRE DEL 2024","literal_dia":"MIERCOLES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-11"},{"dia":5,"fecha_dia":12,"fecha_literal":"JUEVES 12 SETIEMBRE DEL 2024","literal_dia":"JUEVES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-12"},{"dia":6,"fecha_dia":13,"fecha_literal":"VIERNES 13 SETIEMBRE DEL 2024","literal_dia":"VIERNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-13"},{"dia":7,"fecha_dia":14,"fecha_literal":"SABADO 14 SETIEMBRE DEL 2024","literal_dia":"SABADO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-14"}]},{"semana":[{"dia":1,"fecha_dia":15,"fecha_literal":"DOMINGO 15 SETIEMBRE DEL 2024","literal_dia":"DOMINGO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-15"},{"dia":2,"fecha_dia":16,"fecha_literal":"LUNES 16 SETIEMBRE DEL 2024","literal_dia":"LUNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-16"},{"dia":3,"fecha_dia":17,"fecha_literal":"MARTES 17 SETIEMBRE DEL 2024","literal_dia":"MARTES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-17"},{"dia":4,"fecha_dia":18,"fecha_literal":"MIERCOLES 18 SETIEMBRE DEL 2024","literal_dia":"MIERCOLES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-18"},{"dia":5,"fecha_dia":19,"fecha_literal":"JUEVES 19 SETIEMBRE DEL 2024","literal_dia":"JUEVES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-19","datos_doctor":[{"nombre_doctor":"nombre","paterno_doctor":"paterno","materno_doctor":"materno"}]},{"dia":6,"fecha_dia":20,"fecha_literal":"VIERNES 20 SETIEMBRE DEL 2024","literal_dia":"VIERNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-20","datos_doctor":[{"nombre_doctor":"nombre","paterno_doctor":"paterno","materno_doctor":"materno"}]},{"dia":7,"fecha_dia":21,"fecha_literal":"SABADO 21 SETIEMBRE DEL 2024","literal_dia":"SABADO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-21","datos_doctor":[{"nombre_doctor":"nombre","paterno_doctor":"paterno","materno_doctor":"materno"}]}]},{"semana":[{"dia":1,"fecha_dia":22,"fecha_literal":"DOMINGO 22 SETIEMBRE DEL 2024","literal_dia":"DOMINGO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-22","datos_doctor":[{"nombre_doctor":"nombre","paterno_doctor":"paterno","materno_doctor":"materno"}]},{"dia":2,"fecha_dia":23,"fecha_literal":"LUNES 23 SETIEMBRE DEL 2024","literal_dia":"LUNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-23","datos_doctor":[{"nombre_doctor":"nombre","paterno_doctor":"paterno","materno_doctor":"materno"}]},{"dia":3,"fecha_dia":24,"fecha_literal":"MARTES 24 SETIEMBRE DEL 2024","literal_dia":"MARTES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-24","datos_doctor":[{"nombre_doctor":"nombre","paterno_doctor":"paterno","materno_doctor":"materno"}]},{"dia":4,"fecha_dia":25,"fecha_literal":"MIERCOLES 25 SETIEMBRE DEL 2024","literal_dia":"MIERCOLES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-25","datos_doctor":[{"nombre_doctor":"nombre","paterno_doctor":"paterno","materno_doctor":"materno"},{"nombre_doctor":"nombre","paterno_doctor":"paterno","materno_doctor":"materno"}]},{"dia":5,"fecha_dia":26,"fecha_literal":"JUEVES 26 SETIEMBRE DEL 2024","literal_dia":"JUEVES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-26"},{"dia":6,"fecha_dia":27,"fecha_literal":"VIERNES 27 SETIEMBRE DEL 2024","literal_dia":"VIERNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-27"},{"dia":7,"fecha_dia":28,"fecha_literal":"SABADO 28 SETIEMBRE DEL 2024","literal_dia":"SABADO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-28"}]},{"semana":[{"dia":1,"fecha_dia":29,"fecha_literal":"DOMINGO 29 SETIEMBRE DEL 2024","literal_dia":"DOMINGO","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-29"},{"dia":2,"fecha_dia":30,"fecha_literal":"LUNES 30 SETIEMBRE DEL 2024","literal_dia":"LUNES","literal_mes":"SETIEMBRE DEL 2024","fecha_actual":"2024-09-30"},{"dia":3,"fecha_dia":1,"fecha_literal":"MARTES 01 OCTUBRE DEL 2024","literal_dia":"MARTES","literal_mes":"OCTUBRE DEL 2024","fecha_actual":"2024-10-01"},{"dia":4,"fecha_dia":2,"fecha_literal":"MIERCOLES 02 OCTUBRE DEL 2024","literal_dia":"MIERCOLES","literal_mes":"OCTUBRE DEL 2024","fecha_actual":"2024-10-02"},{"dia":5,"fecha_dia":3,"fecha_literal":"JUEVES 03 OCTUBRE DEL 2024","literal_dia":"JUEVES","literal_mes":"OCTUBRE DEL 2024","fecha_actual":"2024-10-03"},{"dia":6,"fecha_dia":4,"fecha_literal":"VIERNES 04 OCTUBRE DEL 2024","literal_dia":"VIERNES","literal_mes":"OCTUBRE DEL 2024","fecha_actual":"2024-10-04"},{"dia":7,"fecha_dia":5,"fecha_literal":"SABADO 05 OCTUBRE DEL 2024","literal_dia":"SABADO","literal_mes":"OCTUBRE DEL 2024","fecha_actual":"2024-10-05"}]}];
  }
 
  datoMedico(datos:any){

  }
  listar_fichas(data:any){
    this.nextSteper.emit();
  }

  
}
