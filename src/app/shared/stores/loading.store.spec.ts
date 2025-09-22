import { TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { LoadingStore } from './loading.store';
import { OccupationService } from '../../features/registration/services/occupation.service';

describe('LoadingStore', () => {
  let store: InstanceType<typeof LoadingStore>; // ⚠️ aqui usamos InstanceType
  // let occupationServiceMock: Partial<OccupationService>;
  let occupationServiceMock: { isLoading: WritableSignal<boolean> };

  beforeEach(() => {
    occupationServiceMock = {
      isLoading: signal(false),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: OccupationService, useValue: occupationServiceMock },
        LoadingStore,
      ],
    });

    store = TestBed.inject(LoadingStore); // pega a instância real da store
  });

  it('should have initial state with isLoading false', () => {
    expect(store.isLoading()).toBe(false);
  });

  it('should set loading state using setLoading', () => {
    store.setLoading(true);
    expect(store.isLoading()).toBe(true);

    store.setLoading(false);
    expect(store.isLoading()).toBe(false);
  });

  //
  it('should return true for isAnyLoading if store.isLoading is true', () => {
    store.setLoading(true);
    expect(store.isAnyLoading()).toBe(true);
  });

  it('should return true for isAnyLoading if occupationService.isLoading is true', () => {
    occupationServiceMock.isLoading.update(() => true);
    expect(store.isAnyLoading()).toBe(true);
  });

  it('should return false for isAnyLoading if both are false', () => {
    store.setLoading(false);
    occupationServiceMock.isLoading.update(() => false);
    expect(store.isAnyLoading()).toBe(false);
  });
});
