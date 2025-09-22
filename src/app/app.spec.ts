import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { RouterOutlet } from '@angular/router';
import { LoadingStore } from './shared/stores/loading.store';
import { of } from 'rxjs';
import { Component } from '@angular/core';

// Mock LoadingStore
class MockLoadingStore {
  isAnyLoading = jest.fn();
}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let loadingStore: MockLoadingStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: LoadingStore, useClass: MockLoadingStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    loadingStore = TestBed.inject(LoadingStore) as unknown as MockLoadingStore;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render <router-outlet>', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    loadingStore.isAnyLoading.mockReturnValue(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-spinner')).toBeTruthy();
  });

  it('should NOT show spinner when not loading', () => {
    loadingStore.isAnyLoading.mockReturnValue(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-spinner')).toBeNull();
  });
});
