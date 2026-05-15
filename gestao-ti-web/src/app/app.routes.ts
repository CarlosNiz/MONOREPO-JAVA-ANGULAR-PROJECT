import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { adminGuard } from '../core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../shared/components/layout/layout')
      .then(m => m.Layout),
    children: [
      {
        path: 'equipments',
        loadComponent: () => import('../features/equipments/equipment-list/equipment-list')
          .then(m => m.EquipmentList)
      },
      {
        path: 'equipments/new',
        loadComponent: () => import('../features/equipments/equipment-form/equipment-form')
          .then(m => m.EquipmentForm)
      },
      {
        path: 'equipments/:id/edit',
        loadComponent: () => import('../features/equipments/equipment-form/equipment-form')
          .then(m => m.EquipmentForm)
      },
      {
        path: 'licenses',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/licenses/license-list/license-list')
          .then(m => m.LicenseList)
      },
      {
        path: 'licenses/new',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/licenses/license-form/license-form')
          .then(m => m.LicenseForm)
      },
      {
        path: 'licenses/:id/edit',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/licenses/license-form/license-form')
          .then(m => m.LicenseForm)
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/users/user-list/user-list')
          .then(m => m.UserList)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'equipments',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];