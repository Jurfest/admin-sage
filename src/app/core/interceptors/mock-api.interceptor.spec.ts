import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { mockApiInterceptor } from './mock-api.interceptor';
import { environment } from '../../../environments/environment';
import {
  Occupation,
  ZipCodeApiResponse,
} from '../../features/registration/models/registration.models';

describe('mockApiInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    environment.useMockApi = true; // enable mock API

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([mockApiInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should pass through requests if useMockApi is false', fakeAsync(() => {
    environment.useMockApi = false;

    const req = new HttpRequest('GET', '/api/v1/occupations');
    const next = jest
      .fn()
      .mockReturnValue(of(new HttpResponse({ status: 200 })));

    let response: any;
    mockApiInterceptor(req, next).subscribe((res) => (response = res));
    tick();

    expect(next).toHaveBeenCalledWith(req);
    expect(response.status).toBe(200);

    environment.useMockApi = true; // reset for other tests
  }));

  it('should return mocked zip code data for GET /api/v1/zipcodes', fakeAsync(() => {
    const mockZip = '12345678';

    let response: ZipCodeApiResponse | undefined;
    httpClient
      .get<ZipCodeApiResponse>(`/api/v1/zipcodes/${mockZip}`)
      .subscribe((res) => (response = res));

    tick(500); // account for interceptor delay

    expect(response).toBeDefined();
    expect(response?.zipcode).toBe(mockZip);
    expect(response?.data.address).toBe('Rua Abc, 123');
  }));

  it('should return mocked occupations for GET /api/v1/occupations', fakeAsync(() => {
    let response: Occupation[] | undefined;

    httpClient
      .get<Occupation[]>('/api/v1/occupations')
      .subscribe((res) => (response = res));

    tick(300);

    expect(response).toBeDefined();
    expect(response?.length).toBeGreaterThan(0);
    expect(response?.[0]).toHaveProperty('id');
    expect(response?.[0]).toHaveProperty('name');
  }));

  it('should pass through non-mocked requests', fakeAsync(() => {
    const req = new HttpRequest('GET', '/api/v1/other');
    const next = jest
      .fn()
      .mockReturnValue(of(new HttpResponse({ status: 204 })));

    let response: any;
    mockApiInterceptor(req, next).subscribe((res) => (response = res));
    tick();

    expect(next).toHaveBeenCalledWith(req);
    expect(response.status).toBe(204);
  }));
});
