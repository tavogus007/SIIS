import { Routes } from '@angular/router';
import { PageCreacionHospitalesComponent } from './page-creacion-hospitales/page-creacion-hospitales.component';
import { PageCreacionFormulariosComponent } from './page-creacion-formularios/page-creacion-formularios.component';


export const routes: Routes = [
  { path: 'hospitales', component: PageCreacionHospitalesComponent },
  { path: 'formulario', component: PageCreacionFormulariosComponent }
  
];
