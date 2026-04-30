import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`,
            { username, password },
            { withCredentials: true }
        );
    }
    
    logout(): Observable<any> {
        return this.http.post(`${this.apiUrl}/logout`, {},
            { withCredentials: true }
        );
    }
}