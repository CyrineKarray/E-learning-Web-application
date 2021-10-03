import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../Models/profile';
import { TokenStorageService } from './token-storage.service';
import { Role } from '../Models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  public getRoles(): Observable<any> {
    return this.http.get<[any]>(`${this.apiServerUrl}/role`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public getRole(roleId: any): Observable<Role> {
    return this.http.get<any>(`${this.apiServerUrl}/role/${roleId}`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiServerUrl}/role`, role, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public updateRole(roleId: any, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiServerUrl}/role/${roleId}`, role, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }
  public deleteRole(roleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/role/${roleId}`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public linkUserToRole(userId: number, roleId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/role/link/${userId}/${roleId}`,
      { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } }
    );
  }

  public clearRoles(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/role/clear/${userId}`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }
}
