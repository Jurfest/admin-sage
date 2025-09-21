import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { environment } from '../../../../environments/environment';
import { Occupation } from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class OccupationService {
  private http = inject(HttpClient);
  private baseUrl = environment.api.baseUrl;

  private occupationsResource = rxResource({
    stream: () => {
      const url = `${this.baseUrl}${environment.api.endpoints.occupations}`;
      return this.http.get<Occupation[]>(url);
    },
  });

  occupations = computed(() => this.occupationsResource.value() ?? [] as Occupation[]);
}
