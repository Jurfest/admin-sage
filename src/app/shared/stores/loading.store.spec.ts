import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { LoadingStore } from './loading.store';
import { OccupationService } from '../../features/registration/services/occupation.service';

describe('LoadingStore', () => {
  let store: InstanceType<typeof LoadingStore>; // ⚠️ aqui usamos InstanceType
  let occupationServiceMock: Partial<OccupationService>;

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
});
