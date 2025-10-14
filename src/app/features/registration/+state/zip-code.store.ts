import { inject } from '@angular/core';
import { catchError, finalize, of, tap } from 'rxjs';
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

const initialState: ZipCodeState = {
  zipCode: '',
  data: null,
  error: null,
  isLoading: false,
};

/**
 * Signal Store automatically turns each property in the state into a signal,
 * and each method into a function that can update the state.
 */
export const ZipCodeStore = signalStore(
  // dependency injection configuration
  { providedIn: 'root' },

  // initial state
  withState<ZipCodeState>(initialState),

  // inject services
  withProps(() => ({
    _zipCodeService: inject(ZipCodeService),
    _loadingStore: inject(LoadingStore),
  })),

  // methods
  withMethods((store) => ({
    lookupZipCode: (zipcode: string) => {
      if (zipcode === store.zipCode()) return;

      patchState(store, { zipCode: zipcode, isLoading: true, error: null });
      store._loadingStore.setLoading(true);

      return store._zipCodeService
        .lookup(zipcode)
        .pipe(
          tap((data) => patchState(store, { data, isLoading: false })),
          catchError(() => {
            patchState(store, {
              error: 'Failed to fetch zip code',
              isLoading: false,
            });
            return of(null);
          }),
          finalize(() => store._loadingStore.setLoading(false))
        )
        .subscribe();
    },

    // Example with async/await and firstValueFrom
    // lookupZipCode: async (zipcode: string) => {
    //   if (zipcode === store.zipCode()) return;

    //   // @patchState is a helper function to update the state
    //   patchState(store, { zipCode: zipcode, isLoading: true, error: null });
    //   store._loadingStore.setLoading(true);

    //   try {
    //     const data = await firstValueFrom(
    //       store._zipCodeService.lookup(zipcode)
    //     );
    //     patchState(store, { data, isLoading: false });
    //     store._loadingStore.setLoading(false);
    //   } catch (error: unknown) {
    //     patchState(store, {
    //       error: 'Failed to fetch zip code',
    //       isLoading: false,
    //     });
    //     store._loadingStore.setLoading(false);
    //   }
    // },
  })),
  // // Example of derived state using withComputed
  // withComputed((store) => ({
  //   address: () => store.data()?.address ?? '',
  //   neighborhood: () => store.data()?.neighborhood ?? '',
  //   city: () => store.data()?.city ?? '',
  //   state: () => store.data()?.state ?? '',
  // })),
  // // lifecycle hooks
  // withHooks((store) => ({
  //   onInit() {
  //     console.log('ZipCodeStore initialized');
  //   },
  //   onDestroy() {
  //     console.log('ZipCodeStore destroyed');
  //   },
  // })),
  // // link to another store
  // withLinkedState(LoadingStore, (loadingStore) => ({ isLoading: loadingStore.isLoading })), // link isLoading to LoadingStore
  // // feature name for devtools
);
