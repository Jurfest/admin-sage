import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

export function debounceSignal<T>(signal: Signal<T>, time: number) {
  const debouncedObservable$ = toObservable(signal).pipe(debounceTime(time));
  return toSignal(debouncedObservable$);
}
