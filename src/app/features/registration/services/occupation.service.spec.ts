import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../../environments/environment';
import { Occupation } from '../models/registration.models';
import { OccupationService } from './occupation.service';

describe('OccupationService (with httpResource)', () => {
  let service: OccupationService;
  let httpMock: HttpTestingController;

  const mockOccupations: Occupation[] = [
    { id: '1', name: 'Developer' },
    { id: '2', name: 'Designer' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccupationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OccupationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load occupations from API', async () => {
    // Trigger resource
    service.occupations();

    // let Angular tick so httpResource issues the request
    TestBed.inject(ApplicationRef).tick();

    // Expect and flush request
    httpMock
      .expectOne(
        `${environment.api.baseUrl}${environment.api.endpoints.occupations}`
      )
      .flush(mockOccupations);

    // wait for Angular app to settle
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.occupations()).toEqual(mockOccupations);
  });

  it('should return empty array if resource not loaded yet', () => {
    expect(service.occupations()).toEqual([]);
  });

  it('should reflect loading state', async () => {
    service.occupations();
    TestBed.inject(ApplicationRef).tick();

    expect(service.isLoading()).toBe(true);

    httpMock
      .expectOne(
        `${environment.api.baseUrl}${environment.api.endpoints.occupations}`
      )
      .flush(mockOccupations);

    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.isLoading()).toBe(false);
  });
});
