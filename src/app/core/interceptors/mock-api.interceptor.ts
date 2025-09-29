import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  Occupation,
  ZipCodeApiResponse,
} from '../../features/registration/models/registration.models';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useMockApi) {
    return next(req);
  }

  // Mock zipcodes endpoint
  if (req.url.includes('/api/v1/zipcodes') && req.method === 'GET') {
    const zipcode = extractZipcode(req.url);
    const mockData = getMockZipCode(zipcode);
    return of(new HttpResponse({ status: 200, body: mockData })).pipe(
      delay(500)
    );
  }

  // Mock occupations endpoint
  if (req.url.includes('/api/v1/occupations') && req.method === 'GET') {
    const mockData = getMockOccupations();
    return of(new HttpResponse({ status: 200, body: mockData })).pipe(
      delay(300)
    );
  }

  return next(req);
};

function extractZipcode(url: string) {
  return url.split('/').pop();
}

function getMockZipCode(zipcode: string): ZipCodeApiResponse {
  const mockResponse: ZipCodeApiResponse = {
    success: true,
    timestamp: new Date().toISOString(),
    zipcode: zipcode,
    data: {
      address: 'Rua Abc, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
    },
    metadata: {
      source: 'mock-api',
      version: '1.0',
    },
  };

  return mockResponse;
}

function getMockOccupations() {
  const mockOccupations: Occupation[] = [
    { id: '1', name: 'Desenvolvedor de Software' },
    { id: '2', name: 'Gerente de Produto' },
    { id: '3', name: 'Designer UX' },
    { id: '4', name: 'Analista de Dados' },
    { id: '5', name: 'Especialista em Marketing' },
    { id: '6', name: 'Representante de Vendas' },
    { id: '7', name: 'Analista Financeiro' },
    { id: '8', name: 'Designer Gráfico' },
    { id: '9', name: 'Gerente de Projeto' },
    { id: '10', name: 'Analista de Negócios' },
  ];

  return mockOccupations;
}
