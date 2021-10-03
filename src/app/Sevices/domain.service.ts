import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
import { Domain } from '../Models/domain';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
 
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  public getDomains(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/domain`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public addDomain(domain: Domain): Observable<Domain> {
    return this.http.post<Domain>(`${this.apiServerUrl}/domain`, domain, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public updateDomain(domainId: number, domain: Domain): Observable<Domain> {
    return this.http.put<Domain>(
      `${this.apiServerUrl}/domain/${domainId}`,
      domain,
      { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } }
    );
  }
  public deleteDomain(domainId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/domain/${domainId}`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public linkDomainToFormation(formationId:number, domainId:number) : Observable<any> {
    return this.http.get<void>(`${this.apiServerUrl}/domain/link/${formationId}/${domainId}`)
  }
}
