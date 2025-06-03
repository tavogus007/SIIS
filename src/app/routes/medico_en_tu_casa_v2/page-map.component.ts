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
import { AssignDeviceDialogComponent } from '../../shared/device-dialog/device-dialog.component';
import { SelectDeviceDialogComponent } from '../../shared/select-device-dialog/select-device-dialog.component';
import { SmartwatchDetailsComponent } from '../smartwatch-details/smartwatch-details.component';
import { SmartwatchService } from '../../services/smartwatch.service';

import { FormAmdService } from '../../services/form-amd.service';
import { MatDialog } from '@angular/material/dialog';

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
    SmartwatchDetailsComponent,

  ],
  templateUrl: './page-map.component.html',
  styleUrl: './page-map.component.scss',
  providers: [FormAmdService, SmartwatchService],
})
export class PageMapComponent implements AfterViewInit, OnDestroy {
  sidebarVisible = true;
  showLocationDetails = false; // Controla qué panel mostrar
  selectedLocation: any = null; // Almacena la ubicación seleccionada
  private map!: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  isDeviceAssigned = false;
  selectedDeviceId: number | null = null;

  selectedDeviceDetails: any = null;

  showSmartwatchDetails = false; // Controlar visibilidad de detalles
  smartwatchData: any = null; // Datos del dispositivo a mostrar

  constructor(
    public mapService: MapService,
    private formAmdService: FormAmdService,
    private smartwatchService: SmartwatchService,
    private dialog: MatDialog
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

        marker.getElement().addEventListener('click', () => {
          this.onMarkerClick(location);
        });

        this.markers.push(marker);
      }
    });
  }

  onMarkerClick(location: any): void {
    this.selectedLocation = location;
    this.showLocationDetails = true;
    this.sidebarVisible = true; // Asegurar que el sidebar esté visible
  }

  closeLocationDetails(): void {
    this.showLocationDetails = false;
    this.selectedLocation = null;
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

    if (!checkbox.checked) {
      this.closeLocationDetails();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  openAssignDeviceDialog(): void {
    const dialogRef = this.dialog.open(AssignDeviceDialogComponent, {
      width: '450px',
      data: {
        patientName: this.selectedLocation.formAmdNombrePaciente,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        this.showDeviceSelection();
      }
    });
  }

  assignDeviceToPatient(device: any): void {
    this.selectedDeviceId = device.smartId;
    this.selectedDeviceDetails = device;
    this.isDeviceAssigned = true;

    console.log('Dispositivo asignado:', this.selectedDeviceId);
    console.log('Detalles del dispositivo:', device);
  }

  inspectDevice(): void {
    if (this.selectedDeviceDetails) {
      this.showSmartwatchDetails = true;
      this.smartwatchData = this.selectedDeviceDetails;
    }
  }

  closeSmartwatchView(): void {
  this.showSmartwatchDetails = false;
  this.smartwatchData = null;
  
  // Redibujar el mapa al volver
  setTimeout(() => {
    if (this.map) {
      this.map.resize();
    }
  }, 100);
}

  removeDevice(): void {
    if (this.selectedDeviceId) {
      // Confirmar retiro
      if (confirm('¿Estás seguro de retirar este dispositivo del paciente?')) {
        // Lógica para retirar el dispositivo (desasignar)
        // this.smartwatchService.unassignDevice(this.selectedLocation.formAmdId, this.selectedDeviceId).subscribe(...);

        // Resetear estado
        this.isDeviceAssigned = false;
        this.selectedDeviceId = null;
        this.selectedDeviceDetails = null;

        console.log('Dispositivo retirado');
      }
    }
  }

  showDeviceSelection(): void {
    // Obtener dispositivos disponibles del backend
    this.smartwatchService.getSmartwatches().subscribe({
      next: devices => {
        this.openDeviceSelectionDialog(devices);
      },
      error: err => {
        console.error('Error obteniendo dispositivos:', err);
        // Manejar error apropiadamente
      },
    });
  }

  openDeviceSelectionDialog(devices: any[]): void {
    const dialogRef = this.dialog.open(SelectDeviceDialogComponent, {
      width: '500px',
      data: {
        devices: devices,
        patientName: this.selectedLocation.formAmdNombrePaciente,
      },
    });

    dialogRef.afterClosed().subscribe(selectedDevice => {
      if (selectedDevice) {
        this.assignDeviceToPatient(selectedDevice);
      }
    });
  }

  reviewDevice(): void {
    if (this.selectedDeviceId) {
      console.log('Revisando dispositivo:', this.selectedDeviceId);
    }
  }
}
