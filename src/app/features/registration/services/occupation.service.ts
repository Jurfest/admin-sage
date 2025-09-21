import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Occupation } from '../models/registration.models';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {
  private http = inject(HttpClient);

  getOccupations(): Observable<Occupation[]> {
    // Mock service - replace with real API
    const mockOccupations: Occupation[] = [
      { id: '1', name: 'Software Developer' },
      { id: '2', name: 'Product Manager' },
      { id: '3', name: 'UX Designer' },
      { id: '4', name: 'Data Analyst' },
      { id: '5', name: 'Marketing Specialist' }
    ];
    
    return of(mockOccupations).pipe(delay(300));
  }
}