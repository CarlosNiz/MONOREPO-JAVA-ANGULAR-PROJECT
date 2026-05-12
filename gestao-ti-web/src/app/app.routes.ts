import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('../features/users/user-list/user-list')
      .then(m => m.UserList)
  },
  {
    path: 'equipments',
    canActivate: [authGuard],
    loadComponent: () => import('../features/equipments/equipment-list/equipment-list')
      .then(m => m.EquipmentList)
  },
  {
    path: 'licenses',
    canActivate: [authGuard],
    loadComponent: () => import('../features/licenses/license-list/license-list')
      .then(m => m.LicenseList)
  },
  {
    path: 'equipments/new',
    canActivate: [authGuard],
    loadComponent: () => import('../features/equipments/equipment-form/equipment-form')
      .then(m => m.EquipmentForm)
  },
  {
    path: 'equipments/:id/edit',
    canActivate: [authGuard],
    loadComponent: () => import('../features/equipments/equipment-form/equipment-form')
      .then(m => m.EquipmentForm)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];