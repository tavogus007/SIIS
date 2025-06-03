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
import { Component, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import mapboxgl from 'mapbox-gl';

import { FormAmdService } from '../../services/form-amd.service';

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
    LeafletModule,
  ],
  templateUrl: './page-map.component.html',
  styleUrl: './page-map.component.scss',
  providers: [FormAmdService]
})
export class PageMapComponent implements AfterViewInit, OnDestroy {
  sidebarVisible = true;
  private map!: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];

  constructor(
    public mapService: MapService,
    private formAmdService: FormAmdService
  ) {}

  ngAfterViewInit(): void {
    this.mapService.initializeMap('map-container');
    this.handleMapInstance();
  }

  private handleMapInstance(): void {
    this.mapService.map$.subscribe(map => {
      if (map) {
        this.map = map;
        this.addControls();
        this.loadLocations();
      }
    });
  }

  private loadLocations(): void {
    this.formAmdService.getLocations().subscribe({
      next: locations => {
        this.addMarkers(locations);
        this.fitMapToMarkers();
      },
      error: err => console.error('Error cargando ubicaciones', err),
    });
  }

  private addMarkers(locations: any[]): void {
    // Limpiar marcadores existentes
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    locations.forEach(location => {
      // Usar los nombres de campos exactos de tu respuesta API
      const lat = location.formAmdLatitud;
      const lng = location.formAmdLongitud;
      const nombre = location.formAmdNombrePaciente;
      const direccion = location.formAmdDireccion;
      const motivo = location.formAmdMotivoConsulta;

      if (lat && lng) {
        const marker = new mapboxgl.Marker({ color: '#4285F4' })
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
            <strong>${nombre || 'Sin nombre'}</strong>
            <p>${direccion}</p>
            <small>Motivo: ${motivo}</small>
          `)
          )
          .addTo(this.map);

        this.markers.push(marker);
      }
    });
  }

  private fitMapToMarkers(): void {
    if (this.markers.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    this.markers.forEach(marker => bounds.extend(marker.getLngLat()));

    this.map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15,
    });
  }

  private addControls(): void {
    if (this.map) {
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      this.map.addControl(
        new mapboxgl.AttributionControl({
          compact: true,
          customAttribution: '© Medico en tu casa V2',
        })
      );
    }
  }
  toggleSidebar(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.sidebarVisible = checkbox.checked;
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
