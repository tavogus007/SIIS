import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-datos-paciente',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatButtonModule,
    MatMenuModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.scss']
})
export class DatosPacienteComponent implements AfterViewInit{
  class:any = 'col-sm-12';
  //class:any = 'col-sm-12 col-md-4';
  @Input() tipoVista: any = [];
  estadoCard:any;

  ngAfterViewInit() {
    this.estadoCard = false;
    switch (this.tipoVista) {
      case 'M':
        setTimeout(() => {
          this.class = 'col-sm-12 col-md-4';
        });
        break;
      case 'S':
        setTimeout(() => {
          this.class = 'col-sm-12';
        });
        break;
      default:
        setTimeout(() => {
          this.class = 'col-sm-12 col-md-4';
        });
        break;
    }
    console.log("------->",this.tipoVista);
    this.funcionActualizar();
  }

  funcionActualizar(){
    setTimeout(() => {
      this.estadoCard = true;
    }, 500);
  }
}
