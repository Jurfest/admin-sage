import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ZipCodeApiResponse,
  ZipCodeResponse,
} from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeService {
  private http = inject(HttpClient);
  private baseUrl = environment.api.baseUrl;

  lookupZipCode(zipcode: string): Observable<ZipCodeResponse> {
    const url = `${this.baseUrl}${environment.api.endpoints.zipcode}`;
    return this.http
      .post<ZipCodeApiResponse>(url, { zipcode })
      .pipe(map((response) => response.data));
  }
}
