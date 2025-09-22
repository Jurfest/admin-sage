import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ZipCodeStore } from './zip-code.store';
import { ZipCodeService } from '../services/zip-code.service';
import { LoadingStore } from '../../../shared/stores/loading.store';
import { ZipCodeResponse } from '../models/registration.models';
import { signal } from '@angular/core';

describe('ZipCodeStore', () => {
  let store: InstanceType<typeof ZipCodeStore>;
  let zipCodeServiceMock: Partial<ZipCodeService>;
  let loadingStoreMock: InstanceType<typeof LoadingStore>;

  beforeEach(() => {
    // Mock do LoadingStore como instância parcial do tipo real
    loadingStoreMock = {
      setLoading: jest.fn(),
      isLoading: signal(false), // signal compatível
    } as unknown as InstanceType<typeof LoadingStore>;

    zipCodeServiceMock = {
      lookup: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ZipCodeService, useValue: zipCodeServiceMock },
        { provide: LoadingStore, useValue: loadingStoreMock },
        ZipCodeStore,
      ],
    });

    store = TestBed.inject(ZipCodeStore);
  });

  it('should have initial state', () => {
    expect(store.zipCode()).toBe('');
    expect(store.data()).toBeNull();
    expect(store.error()).toBeNull();
    expect(store.isLoading()).toBe(false);
  });

  it('should lookup zip code successfully', async () => {
    const fakeData: ZipCodeResponse = { city: 'São Paulo', state: 'SP' } as any;
    (zipCodeServiceMock.lookup as jest.Mock).mockReturnValue(of(fakeData));

    await store.lookupZipCode('01001-000');

    expect(store.zipCode()).toBe('01001-000');
    expect(store.data()).toEqual(fakeData);
    expect(store.error()).toBeNull();
    expect(store.isLoading()).toBe(false);

    expect(loadingStoreMock.setLoading).toHaveBeenCalledWith(true);
    expect(loadingStoreMock.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle lookup error', async () => {
    (zipCodeServiceMock.lookup as jest.Mock).mockReturnValue(
      throwError(() => new Error('Network error'))
    );

    await store.lookupZipCode('01001-000');

    expect(store.zipCode()).toBe('01001-000');
    expect(store.data()).toBeNull();
    expect(store.error()).toBe('Failed to fetch zip code');
    expect(store.isLoading()).toBe(false);

    expect(loadingStoreMock.setLoading).toHaveBeenCalledWith(true);
    expect(loadingStoreMock.setLoading).toHaveBeenCalledWith(false);
  });

  it('should not call service if the same zip code is provided', async () => {
    const fakeData: ZipCodeResponse = { city: 'São Paulo', state: 'SP' } as any;
    (zipCodeServiceMock.lookup as jest.Mock).mockReturnValue(of(fakeData));

    // Set initial zip code
    await store.lookupZipCode('01001-000');

    // Call again with same zip code
    await store.lookupZipCode('01001-000');

    // Service should have been called only once
    expect(zipCodeServiceMock.lookup).toHaveBeenCalledTimes(1);
  });

  it('should set isLoading true before and false after lookup', async () => {
    const fakeData: ZipCodeResponse = { city: 'São Paulo', state: 'SP' } as any;
    (zipCodeServiceMock.lookup as jest.Mock).mockReturnValue(of(fakeData));

    const promise = store.lookupZipCode('01001-000');

    // While awaiting, loading should already be true
    expect(store.isLoading()).toBe(true);

    await promise;

    expect(store.isLoading()).toBe(false);
  });

  it('should reset error when starting a new lookup', async () => {
    (zipCodeServiceMock.lookup as jest.Mock).mockReturnValue(
      throwError(() => new Error('Network error'))
    );

    // Trigger first failure
    await store.lookupZipCode('01001-000');
    expect(store.error()).toBe('Failed to fetch zip code');

    // Provide a new zip code with successful response
    const fakeData: ZipCodeResponse = { city: 'Rio', state: 'RJ' } as any;
    (zipCodeServiceMock.lookup as jest.Mock).mockReturnValue(of(fakeData));

    await store.lookupZipCode('20000-000');
    expect(store.error()).toBeNull();
  });
});
