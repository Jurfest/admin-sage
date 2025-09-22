import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { ZipCodeResponse } from '../models/registration.models';
import { ZipCodeService } from '../services/zip-code.service';
import { LoadingStore } from '../../../shared/stores/loading.store';

export interface ZipCodeState {
  zipCode: string;
  data: ZipCodeResponse | null;
  error: string | null;
  isLoading: boolean;
}

export const ZipCodeStore = signalStore(
  { providedIn: 'root' },

  // initial state
  withState<ZipCodeState>({
    zipCode: '',
    data: null,
    error: null,
    isLoading: false,
  }),

  // inject services
  withProps(() => ({
    _zipCodeService: inject(ZipCodeService),
    _loadingStore: inject(LoadingStore),
  })),

  // methods
  withMethods((store) => ({
    lookupZipCode: async (zipcode: string) => {
      if (zipcode === store.zipCode()) return;

      patchState(store, { zipCode: zipcode, isLoading: true, error: null });
      store._loadingStore.setLoading(true);

      try {
        const data = await firstValueFrom(
          store._zipCodeService.lookup(zipcode)
        );
        patchState(store, { data, isLoading: false });
        store._loadingStore.setLoading(false);
      } catch (error: unknown) {
        patchState(store, {
          error: 'Failed to fetch zip code',
          isLoading: false,
        });
        store._loadingStore.setLoading(false);
        console.error(error);
      }
    },
  }))
);
