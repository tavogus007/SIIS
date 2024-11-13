import { Routes } from '@angular/router';
import { PageEnfermeriaComponent } from './page-enfermeria/page-enfermeria.component';
import { PageConsultorioMedicoComponent } from './page-consultorio-medico/page-consultorio-medico.component';

export const routes: Routes = [
  { path: 'enfermeria', component: PageEnfermeriaComponent },
  { path: 'consultorio-medico', component: PageConsultorioMedicoComponent }
];
