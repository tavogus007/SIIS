import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { LoginComponent } from './routes/sessions/login/login.component';
import { RegisterComponent } from './routes/sessions/register/register.component';
import { MascotasComponent } from './routes/mascotas/mascotas.component';
import { PageMapComponent } from './routes/medico_en_tu_casa_v2/page-map.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    //DESCOMENTAR PARA VOLVER AL ORIGINAL
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      
      //DECOMENTAR
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      { path: 'dashboard', component: DashboardComponent },
      { path: 'mascotas', component: MascotasComponent },
      { path: 'map', component: PageMapComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      {
        path: 'design',
        loadChildren: () => import('./routes/design/design.routes').then(m => m.routes),
      },
      {
        path: 'material',
        loadChildren: () => import('./routes/material/material.routes').then(m => m.routes),
      },
      {
        path: 'media',
        loadChildren: () => import('./routes/media/media.routes').then(m => m.routes),
      },
      {
        path: 'forms',
        loadChildren: () => import('./routes/forms/forms.routes').then(m => m.routes),
      },
      {
        path: 'tables',
        loadChildren: () => import('./routes/tables/tables.routes').then(m => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () => import('./routes/profile/profile.routes').then(m => m.routes),
      },
      {
        path: 'permissions',
        loadChildren: () => import('./routes/permissions/permissions.routes').then(m => m.routes),
      },
      {
        path: 'utilities',
        loadChildren: () => import('./routes/utilities/utilities.routes').then(m => m.routes),
      },

      //{
      //  path: 'mascotas',
       // loadChildren: () => import('./routes/mascotas/mascotas.routes').then(m => m.routes),
      //},

      {
        path: 'medico_en_tu_casa',
        loadChildren: () => import('./routes/medico_en_tu_casa/medic_en_tu_casa.routes').then(m => m.routes),
      },

      // {
      //   path: 'medico_en_tu_casa_v2',
      //   loadChildren: () => import('./routes/medico_en_tu_casa_v2/medico_en_tu_casa_v2.routes').then(m => m.routes),
      // },

      {
        path: 'fichas',
        loadChildren: () => import('./routes/fichas/fichas.routes').then(m => m.routes),
      },
      {
        path: 'admisiones',
        loadChildren: () => import('./routes/admisiones/admisiones.routes').then(m => m.routes),
      },
      {
        path: 'cajas',
        loadChildren: () => import('./routes/cajas/cajas.routes').then(m => m.routes),
      },
      {
        path: 'atenciones',
        loadChildren: () => import('./routes/atenciones/atenciones.routes').then(m => m.routes),
      },
      {
        path: 'administracionHosp',
        loadChildren: () => import('./routes/administracion-hospitalaria/administracion-hospitalaria.routes').then(m => m.routes),
      }
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  //DESCOMENTAR
  { path: '**', redirectTo: 'dashboard' },
  
];
