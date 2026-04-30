import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { License, LicenseRequest } from '../../shared/models/license.model';
import { Page } from '../../shared/models/page.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

private apiUrl = `${environment.apiUrl}/licenses`;

  constructor(private http: HttpClient) {}

  create(license: LicenseRequest): Observable<License> {
    return this.http.post<License>(this.apiUrl, license,
      { withCredentials: true }
    );
  }

  findAll(page = 0, size = 10): Observable<Page<License>> {
    return this.http.get<Page<License>>(`${this.apiUrl}?page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }

  findById(id: string): Observable<License> {
    return this.http.get<License>(`${this.apiUrl}/${id}`,
      { withCredentials: true }
    );
  }

  update(id: string, license: LicenseRequest): Observable<License> {
    return this.http.put<License>(`${this.apiUrl}/${id}`, license,
      { withCredentials: true }
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,
      { withCredentials: true }
    );
  }
}