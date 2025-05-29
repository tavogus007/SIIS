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
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import mapboxgl from 'mapbox-gl';

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
export class PageMapComponent implements AfterViewInit, OnDestroy {
  sidebarVisible = true;
  private map!: mapboxgl.Map;

  constructor(public mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initializeMap('map-container');
    this.handleMapInstance();
  }

  private handleMapInstance(): void {
    this.mapService.map$.subscribe(map => {
      if (map) {
        this.map = map;
        this.addControls();
      }
    });
  }

  private addControls(): void {
    if (this.map) {
      // Añadir controles de navegación
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Añadir atribución personalizada
      this.map.addControl(new mapboxgl.AttributionControl({
        compact: true,
        customAttribution: '© Medico en tu casa V2'
      }));
    }
  }

  toggleSidebar(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.sidebarVisible = checkbox.checked;

    setTimeout(() => {
      if (this.map) {
        this.map.resize();
      }
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}