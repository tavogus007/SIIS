import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CalendarioComponent } from '../calendario/calendario.component';
import { FichasComponent } from '../fichas/fichas.component';
import { ServiciosService } from 'app/routes/servicios/servicios.service';

import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MtxAlertModule } from '@ng-matero/extensions/alert';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reservar-ficha',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    CalendarioComponent,
    FichasComponent,



    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MtxAlertModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './reservar-ficha.component.html',
  styleUrl: './reservar-ficha.component.scss'
})
export class ReservarFichaComponent {

  private readonly http = inject(ServiciosService);
  datosFichas: any = [];
  popupWin:any;
  @ViewChild('stepper', { static: false }) private stepper!: MatStepper;

  nextStep() {
    if (this.stepper) {
      this.funcionSeleccion();
      this.stepper.next();
    } else {
      console.error('El stepper no está disponible.');
    }
  }
  funcionSeleccion() {
    console.log("entra");

    this.datosFichas = [{
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "P"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "P"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "P"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "P"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "O"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "L"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "L"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "L"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "L"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "L"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "L"
    },
    {
      ficha: "C2-MI/002",
      hora: "09:00 a 09:15",
      estado: "L"
    }];
    this.http.dataFichas = this.datosFichas;
    console.log(this.datosFichas);
  }

  funcionImprimirFicha() {
    
    var printContents = "<span style='font-family: Lucida Console;'><center>" +
      "<strong style='font-size: 12px;'>"+ "HOSPITAL MUNICIPAL COTAHUMA" +"</strong><br>" +
      "<strong style='font-size: 12px;'>FICHA DE ATENCION CONSULTA EXTERNA</strong><br><br>" +
      "<strong style='font-size: 12px;'>--------------------------------------------------</strong><br>" +
      "<strong style='font-size: 20px;'>"+ "AD - 002" +"</strong><br><br>" +
      "<strong style='font-size: 20px;'>SERVICIO "+ "MEDICINA GENERAL" +"</strong><br>" +
      "<table><tr><td align='right'><strong style='font-size: 12px;'>Doctor: </strong></td><td align='left'><strong style='font-size: 12px;'>"+ "DOC. FERNANDO" +"</strong></td></tr>" +
      "<tr><td align='right'><strong style='font-size: 12px;'>Fecha Atencion: </strong></td><td align='left'><strong style='font-size: 12px;'>"+ "12-10-2023" +"</strong></td></tr>" +
      "<tr><td align='right'><strong style='font-size: 12px;'>Turno: </strong></td><td align='left'><strong style='font-size: 12px;'>"+ "TURNO CONTINUO" +"</strong></td></tr>" +
      "<tr><td align='right'><strong style='font-size: 12px;'>Hora: </strong></td><td align='left'><strong style='font-size: 12px;'>"+ "08:30" +"</strong></td></tr>" +
      "<tr><td align='right'><strong style='font-size: 12px;'>Historia Clínica SICE: </strong></td><td align='left'><strong style='font-size: 12px;'>"+ "200" +"</strong></td></tr>" +
      "<tr><td align='right'><strong style='font-size: 12px;'>Paciente: </strong></td><td align='left'><strong style='font-size: 12px;'>"+ "Luis ariel tarifa Oblitas." +"</strong></td></tr>" +
      "<tr><td align='right'><strong style='font-size: 12px;'>Tipo Paciente: </strong></td><td align='left'><strong style='font-size: 12px;'>"+ "SUS" +"</strong></td></tr></table>" +
      "<strong style='font-size: 12px;'>--------------------------------------------------</strong><br>" +
      "<strong style='font-size: 12px;'>"+ "CONSULTA" +"&nbsp;&nbsp;"+ "25 Bs" +"&nbsp;&nbsp;Bs.</strong><br>" +
      "<strong style='font-size: 12px;'>&nbsp;&nbsp;</strong><br>" +
      "<strong style='font-size: 12px;'>--------------------------------------------------</strong><br>" +
      "<strong style='font-size: 12px;'>Se sugiere que todo paciente debe estar como minimo 15 min antes de la atencion reservada y recomendable al menos 30 min.</strong><br>" +
      "<strong style='font-size: 12px;'>Para solicitar su Cita Medica por Internet ingrese al iGob 24/7 en www.lapaz.bo</strong><br>" +
      "<strong style='font-size: 12px;'></strong><br>" +
      "</center></span>" +
      "<center><span>" +
      "<strong style='font-size: 12px;'>"+ "12-10-2024" +"&nbsp;&nbsp;"+ "07:30" +"</strong> <br>" +
      "<strong style='font-size: 12px;'>"+ "usuario.administrador" +"</strong>" +
      "</span></center>";
    this.popupWin = window.open('', '_blank', 'width=400,height=400');
    this.popupWin.document.open()
    this.popupWin.document.write('<html><head></head><body onload="window.print()">' + printContents + '<br><br></html>');
    this.popupWin.document.close();
  } 
}
