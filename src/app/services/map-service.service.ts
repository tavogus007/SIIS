import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import mapboxgl from 'mapbox-gl';

@Injectable({ providedIn: 'root' })
export class MapService {
  private sidebarVisible = new BehaviorSubject<boolean>(true);
  private mapInstance = new BehaviorSubject<mapboxgl.Map | null>(null);

  sidebarVisible$ = this.sidebarVisible.asObservable();
  map$ = this.mapInstance.asObservable();

  initializeMap(mapContainer: string): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;

    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-68.1333, -16.4955], // [lng, lat]
      zoom: 17,
      attributionControl: false,
    });

    this.mapInstance.next(map);
  }

  toggleSidebar(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  getMapInstance(): mapboxgl.Map | null {
    return this.mapInstance.value;
  }
}
