import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../services/map-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { latLng, tileLayer, Map } from 'leaflet';


@Component({
  selector: 'map',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    LeafletModule
  ],
  templateUrl: './page-map.component.html',
  styleUrl: './page-map.component.scss',
})
export class PageMapComponent implements AfterViewInit {
  
  constructor(public mapService: MapService) {}
   sidebarVisible = true;
   

   mapOptions: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      })
    ],
    zoom: 17,
    center: L.latLng(-16.4955, -68.1333), // Plaza Murillo
  };

   private map!: L.Map;

  // Inicializar el mapa después de la renderización
  ngAfterViewInit(): void {
  this.mapService.map$.subscribe((map: L.Map | null) => { // Define el tipo
    if (map) {
      this.map = map;
    }
  });
}

  toggleSidebar(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.sidebarVisible = checkbox.checked;

    // Forzar actualización del tamaño del mapa
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 300);
  }
}
