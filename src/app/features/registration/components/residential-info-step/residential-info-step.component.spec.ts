import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNgxMask } from 'ngx-mask';
import { ResidentialInfoStepComponent } from './residential-info-step.component';
import { ZipCodeStore } from '../../+state/zip-code.store';
import { signal } from '@angular/core';

// Simple class-based mock
class MockZipCodeStore {
  lookupZipCode = jest.fn();
  // Use a function to mimic DeepSignal call
  data = jest.fn().mockReturnValue({
    address: '',
    neighborhood: '',
    city: '',
    state: '',
  });
}

describe('ResidentialInfoStepComponent', () => {
  let component: ResidentialInfoStepComponent;
  let fixture: ComponentFixture<ResidentialInfoStepComponent>;
  let storeMock: MockZipCodeStore;
  let formGroup: FormGroup;

  beforeEach(async () => {
    storeMock = new MockZipCodeStore();

    formGroup = new FormGroup({
      zipCode: new FormControl(''),
      address: new FormControl(''),
      neighborhood: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
    });

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ResidentialInfoStepComponent,
      ],
      providers: [
        provideNgxMask(),
        { provide: ZipCodeStore, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentialInfoStepComponent);
    component = fixture.componentInstance;
    component.formGroup = signal(formGroup) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call store.lookupZipCode when zipCode has 8 digits after debounce', fakeAsync(() => {
    component.ngOnInit();
    formGroup.get('zipCode')?.setValue('12345-678');
    tick(500); // debounceTime
    expect(storeMock.lookupZipCode).toHaveBeenCalledWith('12345678');
  }));

  it('should not call store.lookupZipCode for invalid zipCode', fakeAsync(() => {
    component.ngOnInit();
    formGroup.get('zipCode')?.setValue('123'); // too short
    tick(500);
    expect(storeMock.lookupZipCode).not.toHaveBeenCalled();
  }));
});
