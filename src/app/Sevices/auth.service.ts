import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5000/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(
      'http://localhost:5000/api/v1/auth/login',
      {
        login: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user: { username: any; password: any }): Observable<any> {
    return this.http.post(
      'http://localhost:5000/api/v1/user/signup',
      {
        login: user.username,
        password: user.password,
      },
      httpOptions
    );
  }

  link(code: any): Observable<any> {
    return this.http.get(
      `http://localhost:5000/api/v1/role/link/${code}/2`,
      httpOptions
    );
  }
}
