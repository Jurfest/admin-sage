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

  // inject service
  withProps(() => ({
    _zipCodeService: inject(ZipCodeService),
  })),

  // methods
  withMethods((store) => ({
    lookupZipCode: async (zipcode: string) => {
      if (zipcode === store.zipCode()) return;

      patchState(store, { zipCode: zipcode, isLoading: true, error: null });

      try {
        const data = await firstValueFrom(store._zipCodeService.lookup(zipcode));
        patchState(store, { data, isLoading: false });
      } catch (error: unknown) {
        patchState(store, {
          error: 'Failed to fetch zip code',
          isLoading: false,
        });
        console.error(error);
      }
    },
  }))
);

