import { Routes } from '@angular/router';
import { PageAgendaComponent } from './page-agenda/page-agenda.component';
import { PageHistorialComponent } from './page-historial/page-historial.component';
import { PageRutaComponent } from './page-ruta/page-ruta.component';

export const routes: Routes = [
  { path: 'agenda', component: PageAgendaComponent },
  { path: 'historial', component: PageHistorialComponent },
  { path: 'ruta', component: PageRutaComponent },
];
