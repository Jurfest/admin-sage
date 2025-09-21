import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { ZipCodeResponse } from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeService {
  private http = inject(HttpClient);

  getAddressByZipCode(zipCode: string): Observable<ZipCodeResponse> {
    // Mock service - replace with real API
    const mockResponse: ZipCodeResponse = {
      address: 'Rua Abc, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
    };

    return of(mockResponse).pipe(delay(500));
  }
}