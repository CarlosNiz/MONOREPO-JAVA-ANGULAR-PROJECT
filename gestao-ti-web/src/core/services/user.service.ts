import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { User, UserRequest } from "../../shared/models/user.model";
import { Observable } from "rxjs";
import { Page } from "../../shared/models/page.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
  
    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}

    createUser(user: UserRequest): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}`, user, 
            { withCredentials: true }
        );
    }

    findAll(page = 0, size = 10): Observable<Page<User>> {
        return this.http.get<Page<User>>(`${this.apiUrl}?page=${page}&size=${size}`, 
            { withCredentials: true }
        );
    }

    findById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`, 
            { withCredentials: true }
        );
    }
    
    update(id: number, user: UserRequest): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user, 
            { withCredentials: true }
        );
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, 
            { withCredentials: true }
        );
    }

    promote(id: string): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/${id}/promote`, {}, 
            { withCredentials: true }
        );
    }
}