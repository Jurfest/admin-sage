import {
  HttpClient,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { errorInterceptor } from './error-interceptor';

describe('errorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let snackBarOpenMock: jest.Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        importProvidersFrom(MatSnackBarModule),
        {
          provide: MatSnackBar,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    snackBarOpenMock = TestBed.inject(MatSnackBar).open as jest.Mock;
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
  });

  it('should create interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it.each([
    {
      error: 400,
      message:
        'Houve um erro com sua solicitação. Verifique os dados e tente novamente.',
    },
    {
      error: 403,
      message: 'Você não tem permissão para acessar este recurso.',
    },
    {
      error: 404,
      message: 'O recurso solicitado não foi encontrado.',
    },
    {
      error: 500,
      message: 'Ocorreu um erro inesperado no servidor.',
    },
    {
      error: 501,
      message: 'Ocorreu um erro inesperado no servidor.',
    },
    {
      error: 502,
      message: 'Ocorreu um erro inesperado no servidor.',
    },
    {
      error: 503,
      message: 'Ocorreu um erro inesperado no servidor.',
    },
    {
      error: 401,
      message: 'Ocorreu um erro inesperado no servidor.',
    },
  ])(
    'should show snackbar with correct message for error %error',
    fakeAsync(({ error, message }) => {
      const url = 'https://example.com/api/data';

      httpClient.get(url).subscribe({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: () => {},
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');

      req.flush(null, { status: error ?? 0, statusText: 'Error' });
      tick();

      expect(snackBarOpenMock).toHaveBeenCalledTimes(error ? 1 : 0);
      if (error) {
        expect(snackBarOpenMock).toHaveBeenCalledWith(message, 'Fechar', {
          duration: 5000,
        });
      }
    })
  );

  it('should not display snackbar for 404 from API base URL', fakeAsync(() => {
    const url = environment.api.baseUrl + '/endpoint';
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    httpClient.get(url).subscribe({ error: () => {} });

    const req = httpMock.expectOne(url);
    req.flush(null, { status: 404, statusText: 'Not Found' });
    tick();

    expect(snackBarOpenMock).not.toHaveBeenCalled();
  }));

  it('should handle successful HttpResponse', fakeAsync(() => {
    const url = 'https://example.com/api/data';
    const response = { response: { data: 123 } };

    let result: any;
    httpClient.get(url).subscribe((res) => (result = res));

    const req = httpMock.expectOne(url);
    req.flush(response);
    tick();

    expect(result).toEqual(response.response);
  }));

  it('should handle generic Error thrown in interceptor', fakeAsync(() => {
    const req = new HttpRequest('GET', 'https://example.com/api/data');
    const error = new Error('Unexpected error');

    interceptor(req, () => throwError(() => error)).subscribe({
      error: (err) => {
        expect(err).toBe(error);
      },
    });
    tick();

    expect(snackBarOpenMock).toHaveBeenCalledWith(
      'Ocorreu um erro inesperado: Unexpected error',
      'Fechar',
      { duration: 5000 }
    );
  }));
});
