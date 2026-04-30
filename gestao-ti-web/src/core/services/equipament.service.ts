import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment, EquipmentRequest } from '../../shared/models/equipment.model';
import { Page } from '../../shared/models/page.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = `${environment.apiUrl}/equipments`;

  constructor(private http: HttpClient) {}

  create(equipment: EquipmentRequest): Observable<Equipment> {
    return this.http.post<Equipment>(this.apiUrl, equipment,
      { withCredentials: true }
    );
  }

  findAll(page = 0, size = 10): Observable<Page<Equipment>> {
    return this.http.get<Page<Equipment>>(`${this.apiUrl}?page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }

  findById(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.apiUrl}/${id}`,
      { withCredentials: true }
    );
  }

  update(id: string, equipment: EquipmentRequest): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiUrl}/${id}`, equipment,
      { withCredentials: true }
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,
      { withCredentials: true }
    );
  }
}