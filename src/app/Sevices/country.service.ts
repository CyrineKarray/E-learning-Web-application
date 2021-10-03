import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../Models/country';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  public getCountries(): Observable<Country[]> {
    return this.http.get<[Country]>(`${this.apiServerUrl}/country`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${this.apiServerUrl}/country`, country, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public updateCountry(countryId: any, country: Country): Observable<Country> {
    return this.http.put<Country>(
      `${this.apiServerUrl}/country/${countryId}`,
      country,
      { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } }
    );
  }
  public deleteCountry(countryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/country/${countryId}`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public linkCountryToParticipant(
    participantId: any,
    countryId: any
  ): Observable<void> {
    return this.http.get<void>(
      `${this.apiServerUrl}/country/link/${participantId}/${countryId}`,
      { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } }
    );
  }
}
