import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const authReq = req.clone({
    withCredentials: true
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          return throwError(() => new Error('Servidor indisponível. Verifique sua conexão!'));
        case 401:
          router.navigate(['/login']);
          return throwError(() => new Error('Sessão expirada. Faça login novamente!'));
        case 403:
          return throwError(() => new Error('Você não tem permissão para realizar essa ação!'));
        case 404:
          return throwError(() => new Error('Recurso não encontrado!'));
        case 409:
          return throwError(() => new Error(error.error?.message || 'Registro já existe!'));
        case 500:
          return throwError(() => new Error('Erro interno no servidor!'));
        default:
          return throwError(() => new Error(error.error?.message || 'Erro inesperado!'));
      }
    })
  );
};