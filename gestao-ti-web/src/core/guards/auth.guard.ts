import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkSession().pipe(
    map(() => true),
    catchError(() => {
      localStorage.removeItem('authenticated');
      router.navigate(['/login']);
      return of(false);
    })
  );
};