import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<[User]>(`${this.apiServerUrl}/user`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public updateUser(user: any, userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/user/${userId}`, user, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/${userId}`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public clearRoles(userId: number): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/role/clear/${userId}`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public linkUserToRole(userId: number, roleId: number): Observable<void> {
    return this.http.get<void>(
      `${this.apiServerUrl}/role/link/${userId}/${roleId}`
    );
  }
}
