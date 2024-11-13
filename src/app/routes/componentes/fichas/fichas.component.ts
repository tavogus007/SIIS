import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ServiciosService } from 'app/routes/servicios/servicios.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';


@Component({
  selector: 'app-fichas',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fichas.component.html',
  styleUrl: './fichas.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FichasComponent implements OnInit, AfterViewInit {
  private readonly http = inject(ServiciosService);
  datosFichas:any =[];
  dialog = inject(MatDialog);

  ngOnInit(): void {
    console.log("rrrr");
    
    this.datosFichas = this.http.dataFichas;
    console.log("--*esto*--",this.datosFichas);
  }
  

  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      disableClose: true,
      data: {
        tipo: 'error',
        titulo:"Atencion!",
        mensaje:"Esta seguro de reservar la ficha AD - 002"
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Respons', result);
    });
  }


  ///////////////////////// ESTILOS /////////////////////////
  private directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
  private classNames: string[] = ['in', 'out']
    .map(p => Object.values(this.directions).map(d => `${p}-${d}`))
    .reduce((a, b) => a.concat(b));
  
  ngAfterViewInit() {
    this.initializeHoverEffects();
  }

  private initializeHoverEffects() {
    const nodes = Array.from(document.querySelectorAll('li')) as HTMLElement[];

    nodes.forEach(node => new Item(node, this.classNames, this.directions));
  }

  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.update(target, event, 'in');
  }

  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.update(target, event, 'out');
  }

  private update(element: HTMLElement, ev: MouseEvent, prefix: string) {
    element.classList.remove(...this.classNames);
    const direction = ''//this.directions[this.getDirectionKey(ev, element)];
    element.classList.add(`${prefix}-${direction}`);
  }

  private getDirectionKey(ev: MouseEvent, node: HTMLElement): number {
    const { width, height, top, left } = node.getBoundingClientRect();
    const l = ev.pageX - (left + window.pageXOffset);
    const t = ev.pageY - (top + window.pageYOffset);
    const x = l - width / 2 * (width > height ? height / width : 1);
    const y = t - height / 2 * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  }

  /*private getDirectionKey(ev: MouseEvent, node: HTMLElement): number {
    const { width, height, top, left } = node.getBoundingClientRect();
    const l = ev.pageX - (left + window.pageXOffset);
    const t = ev.pageY - (top + window.pageYOffset);
    const x = l - width / 2 * (width > height ? height / width : 1);
    const y = t - height / 2 * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  }*/
}

class Item {
  constructor(
    private element: HTMLElement,
    private classNames: string[],
    private directions: { [key: number]: string }
  ) {
    this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
    this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
  }

  private update(ev: MouseEvent, prefix: string) {
    this.element.classList.remove(...this.classNames);
    const direction = this.directions[this.getDirectionKey(ev, this.element)];
    this.element.classList.add(`${prefix}-${direction}`);
  }

  private getDirectionKey(ev: MouseEvent, node: HTMLElement): number {
    const { width, height, top, left } = node.getBoundingClientRect();
    const l = ev.pageX - (left + window.pageXOffset);
    const t = ev.pageY - (top + window.pageYOffset);
    const x = l - width / 2 * (width > height ? height / width : 1);
    const y = t - height / 2 * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  }
}
