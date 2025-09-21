import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Occupation } from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class OccupationService {
  private http = inject(HttpClient);
  private baseUrl = environment.api.baseUrl;

  getOccupations(): Observable<Occupation[]> {
    const url = `${this.baseUrl}${environment.api.endpoints.occupations}`;
    return this.http.get<Occupation[]>(url);
  }
}
