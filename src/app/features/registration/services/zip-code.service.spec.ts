// zip-code.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ZipCodeService } from './zip-code.service';
import { environment } from '../../../../environments/environment';
import {
  ZipCodeApiResponse,
  ZipCodeResponse,
} from '../models/registration.models';

describe('ZipCodeService', () => {
  let service: ZipCodeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ZipCodeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ZipCodeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that no unexpected HTTP requests were made.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('lookup() should GET and return the data property from response', () => {
    const zip = '12345';
    const mockResponse = {
      data: {
        address: 'address test',
        neighborhood: 'neighborhood test',
        city: 'neighborhood city',
        state: 'neighborhood city',
      },
    } as ZipCodeApiResponse;

    service.lookup(zip).subscribe((resp: ZipCodeResponse) => {
      expect(resp).toEqual(mockResponse.data);
    });

    const expectedUrl = `${environment.api.baseUrl}${environment.api.endpoints.zipcodes}/${zip}`;
    const req = httpTestingController.expectOne(expectedUrl);

    // check method
    expect(req.request.method).toBe('GET');

    // respond
    req.flush(mockResponse);
  });

  it('lookup() should propagate HTTP errors', () => {
    const zip = '99999';
    const mockError = {
      status: 500,
      statusText: 'Server Error',
    };

    service.lookup(zip).subscribe({
      next: () => {
        // should not succeed
        fail('expected an error, but got a success');
      },
      error: (error) => {
        expect(error.status).toBe(mockError.status);
        expect(error.statusText).toBe(mockError.statusText);
      },
    });

    const expectedUrl = `${environment.api.baseUrl}${environment.api.endpoints.zipcodes}/${zip}`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toBe('GET');
    expect(req.request.url.split('/').pop()).toEqual(zip);

    req.flush(null, mockError);
  });
});
