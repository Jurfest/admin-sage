import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

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
  }))
);
