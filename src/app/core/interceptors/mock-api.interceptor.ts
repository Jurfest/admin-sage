import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  Occupation,
  ZipCodeResponse,
} from '../../features/registration/models/registration.models';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useMockApi) {
    return next(req);
  }

  // Mock zipcode endpoint
  if (req.url.includes('/api/v1/zipcode') && req.method === 'POST') {
    const body = req.body as { zipcode: string };
    const mockData = getMockZipCode(body.zipcode);
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

function getMockZipCode(zipcode: string): ZipCodeResponse {
  const mockResponse: ZipCodeResponse = {
    address: 'Rua Abc, 123',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
  };

  return mockResponse;
}

function getMockOccupations() {
  const mockOccupations: Occupation[] = [
    { id: '1', name: 'Software Developer' },
    { id: '2', name: 'Product Manager' },
    { id: '3', name: 'UX Designer' },
    { id: '4', name: 'Data Analyst' },
    { id: '5', name: 'Marketing Specialist' },
  ];

  return mockOccupations;
}
