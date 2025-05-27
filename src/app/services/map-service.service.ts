import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Map } from 'leaflet';
import * as L from 'leaflet';

@Injectable({ providedIn: 'root' })
export class MapService {
  private sidebarVisible = new BehaviorSubject<boolean>(true);
  private mapInstance = new BehaviorSubject<L.Map | null>(null);

  sidebarVisible$ = this.sidebarVisible.asObservable();
  map$ = this.mapInstance.asObservable();

  setMap(map: Map): void {
    this.mapInstance.next(map);
  }

  // Alternar visibilidad
  toggleSidebar(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  // Obtener el valor actual (si lo necesitas)
  getSidebarState(): boolean {
    return this.sidebarVisible.value;
  }

  // Forzar mostrar u ocultar (si se necesita)
  setSidebarState(visible: boolean): void {
    this.sidebarVisible.next(visible);
  }
}
