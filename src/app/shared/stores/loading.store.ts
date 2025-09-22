import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { OccupationService } from '../../features/registration/services/occupation.service';

export interface LoadingState {
  isLoading: boolean;
}

export const LoadingStore = signalStore(
  { providedIn: 'root' },
  withState<LoadingState>({
    isLoading: false,
  }),
  withMethods((store) => ({
    setLoading: (loading: boolean) => patchState(store, { isLoading: loading }),
  })),
  withComputed((store) => {
    const occupationService = inject(OccupationService);
    return {
      isAnyLoading: computed(() => 
        store.isLoading() || occupationService.isLoading()
      ),
    };
  })
);
