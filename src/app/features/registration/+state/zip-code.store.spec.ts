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
});
