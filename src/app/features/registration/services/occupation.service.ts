import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { environment } from '../../../../environments/environment';
import { Occupation } from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class OccupationService {
  // private http = inject(HttpClient);
  private baseUrl = environment.api.baseUrl;

  // Using rxResource
  // private occupationsResource = rxResource({
  //   stream: () => {
  //     const url = `${this.baseUrl}${environment.api.endpoints.occupations}`;
  //     return this.http.get<Occupation[]>(url);
  //   },
  // });

  // NOTE: - Resource API should be used for simple GET requests (currently v21.0.0-next.5)
  private occupationsResource = httpResource<Occupation[]>(
    () => `${this.baseUrl}${environment.api.endpoints.occupations}`
  );

  // private occupationsResource = httpResource<Occupation[]>(() => ({
  //   url: `${this.baseUrl}${environment.api.endpoints.occupations}`,
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //   },
  // }));

  occupations = computed(
    () => this.occupationsResource.value() ?? ([] as Occupation[])
  );

  isLoading = this.occupationsResource.isLoading;
}
