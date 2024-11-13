import { Routes } from '@angular/router';
import { PageAdmisionComponent } from './page-admision/page-admision.component';
import { PageKardexComponent } from './page-kardex/page-kardex.component';




export const routes: Routes = [
  { path: 'admision', component: PageAdmisionComponent },
  { path: 'kardex', component: PageKardexComponent }
  
];
