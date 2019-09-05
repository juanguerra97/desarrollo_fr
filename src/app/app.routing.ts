import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {OnlyLoggedInUsersGuard} from './auth/only-logged-in-users.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [OnlyLoggedInUsersGuard],
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivateChild:[OnlyLoggedInUsersGuard],
    canLoad:[OnlyLoggedInUsersGuard],
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./views/reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: 'asignaciones',
        loadChildren: () => import('./views/asignaciones/asignaciones.module').then(m => m.AsignacionesModule)
      },
      {
        path: 'bases',
        loadChildren: () => import('./views/tablas-base/tablas-base.module').then(m => m.TablasBaseModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./views/cursos/cursos.module').then(m => m.CursosModule),
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
