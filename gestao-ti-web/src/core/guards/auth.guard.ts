import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkSession().pipe(
    tap((user: any) => {
      localStorage.setItem('userRole', user.role);
    }),
    map(() => true),
    catchError(() => {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('userRole');
      router.navigate(['/login']);
      return of(false);
    })
  );
};