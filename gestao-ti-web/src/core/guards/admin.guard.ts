import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkSession().pipe(
    map((user: any) => {
      if (user.role === 'ROLE_ADMIN') {
        localStorage.setItem('userRole', user.role);
        return true;
      }
      router.navigate(['/equipments']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};