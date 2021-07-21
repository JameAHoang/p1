import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthPayloadRes } from './models/auth-payload-res.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<AuthPayloadRes> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FiREBASE_API_KEY}`;
    const reqBodyPayload = { email, password, returnSecureToken: true };
    return this.http.post<AuthPayloadRes>(url, reqBodyPayload);
  }
 
}
