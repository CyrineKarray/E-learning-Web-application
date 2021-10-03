import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../Models/profile';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  public getProfiles(): Observable<Profile[]> {
    return this.http.get<[Profile]>(`${this.apiServerUrl}/profile`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.apiServerUrl}/profile`, profile, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public updateProfile(
    profileId: number,
    profile: Profile
  ): Observable<Profile> {
    return this.http.put<Profile>(
      `${this.apiServerUrl}/profile/${profileId}`,
      profile,
      { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } }
    );
  }
  public deleteProfile(profileId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/profile/${profileId}`, {
      headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` },
    });
  }

  public linkProfileToParticipant(
    participantId: any,
    profileId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiServerUrl}/profile/link/${participantId}/${profileId}`,
      { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } }
    );
  }
}
