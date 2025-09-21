import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ZipCodeResponse } from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeService {
  private http = inject(HttpClient);
  private baseUrl = environment.api.baseUrl;

  lookupZipCode(zipcode: string): Observable<ZipCodeResponse> {
    const url = `${this.baseUrl}${environment.api.endpoints.zipcode}`;
    return this.http.post<ZipCodeResponse>(url, { zipcode });
  }
}
