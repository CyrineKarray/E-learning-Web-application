import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Participant } from '../Models/participant';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) { }

  public getParticipants():Observable<Participant[]>{
    return this.http.get<[Participant]>(`${this.apiServerUrl}/participant`,{headers:{Authorization:`Bearer ${this.tokenStorage.getToken()}`}});
  }
  
  public addParticipant(participant: any): Observable<Participant> {
    return this.http.post<Participant>(`${this.apiServerUrl}/participant`, participant, {headers:{Authorization:`Bearer ${this.tokenStorage.getToken()}`}});
  }

  public updateParticipant(participant: any,participantId: number): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/participant/${participantId}`, participant,{headers:{Authorization:`Bearer ${this.tokenStorage.getToken()}`}});
  }

  public deleteParticipant(participantId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/participant/${participantId}`,{headers:{Authorization:`Bearer ${this.tokenStorage.getToken()}`}});
  }

  public linkNewSessionToParticipant(sessionId:number, participantId:number): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/participant/link/${sessionId}/${participantId}`,{headers:{Authorization:`Bearer ${this.tokenStorage.getToken()}`}});
  }

  public clearSessionsForParticipant(participantId:number):Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/participant/clear/${participantId}`,{headers:{Authorization:`Bearer ${this.tokenStorage.getToken()}`}});
  }

}
