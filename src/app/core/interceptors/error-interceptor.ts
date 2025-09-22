import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

export const errorInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<unknown>> => {
  const snackBar = inject(MatSnackBar);

  const openSnackBar = (message: string): void => {
    snackBar.open(message, 'Fechar', {
      duration: 5000,
    });
  };

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        event = event.clone({ body: event.body.response });
      }
      return event;
    }),
    catchError((error: HttpErrorResponse | Error) => {
      if (error instanceof HttpErrorResponse) {
        const errorMessage = getHttpErrorMessage(error, req.url);
        if (errorMessage) {
          openSnackBar(errorMessage);
        }
      } else if (error instanceof Error) {
        openSnackBar(`Ocorreu um erro inesperado: ${error.message}`);
      } else {
        openSnackBar(
          'Ocorreu um erro desconhecido. Tente novamente mais tarde.'
        );
      }
      return throwError(() => error);
    })
  );
};

const getHttpErrorMessage = (
  error: HttpErrorResponse,
  url: string
): string | null => {
  switch (error.status) {
    case 404:
      if (!url.startsWith(environment.api.baseUrl)) {
        return 'O recurso solicitado não foi encontrado.';
      }
      break;
    case 403:
      return 'Você não tem permissão para acessar este recurso.';
    case 400:
      return 'Houve um erro com sua solicitação. Verifique os dados e tente novamente.';
    case 503:
    case 502:
    case 501:
    case 500:
    case 401:
      return 'Ocorreu um erro inesperado no servidor.';
    default:
      return 'Ocorreu um erro inesperado na solicitação. Verifique sua conexão com a internet.';
  }
  return null;
};
