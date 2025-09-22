import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { OccupationService } from './occupation.service';
import { Occupation } from '../models/registration.models';
import { environment } from '../../../../environments/environment';

describe('OccupationService', () => {
  let service: OccupationService;
  let httpClientMock: { get: jest.Mock };

  const mockOccupations: Occupation[] = [
    { id: '1', name: 'Developer' },
    { id: '2', name: 'Designer' },
  ];

  beforeEach(() => {
    httpClientMock = { get: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        OccupationService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    service = TestBed.inject(OccupationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load occupations from API', async () => {
    // Mock HttpClient.get to return observable
    httpClientMock.get.mockReturnValue(of(mockOccupations));

    // Wait a tick for rxResource to fetch
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(httpClientMock.get).toHaveBeenCalledWith(
      `${environment.api.baseUrl}${environment.api.endpoints.occupations}`
    );

    // occupations should return the mocked array
    expect(service.occupations()).toEqual(mockOccupations);
  });

  it('should return empty array if resource not loaded yet', () => {
    // occupationsResource hasn't emitted yet
    expect(service.occupations()).toEqual([]);
  });

  it('should reflect loading state', async () => {
    // Initially loading is true while rxResource starts fetching
    httpClientMock.get.mockReturnValue(of(mockOccupations));

    // isLoading should be a signal, initially true when resource starts
    const initialLoading = service.isLoading();
    expect(typeof initialLoading).toBe('boolean');

    await new Promise((resolve) => setTimeout(resolve, 0));

    // After fetch, loading should be false
    expect(service.isLoading()).toBe(false);
  });
});
