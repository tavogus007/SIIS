import { Routes } from '@angular/router';
import { PageDispensadorComponent } from './page-dispensador/page-dispensador.component';
import { PageMonitorComponent } from './page-monitor/page-monitor.component';



export const routes: Routes = [
  { path: 'dispensador', component: PageDispensadorComponent },
  { path: 'monitor', component: PageMonitorComponent }
  
];
