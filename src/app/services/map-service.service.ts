import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapService {
   private sidebarVisible = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this.sidebarVisible.asObservable();

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
