import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Session} from '../Models/session'
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiServerUrl = environment.apiBaseUrl
  constructor(private http:HttpClient) {}

  public getSessions(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/session`)
  }

  public getParticipantsOfSessions(sessionId:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/session/participants/${sessionId}`)
  }

  public addSession(session:Session) :Observable<void>{
    return this.http.post<void>(`${this.apiServerUrl}/session`,session)
  }

  public updateSession(session:Session, sessionId:number|undefined):Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/session/${sessionId}`,session)
  }

  public deleteSession(sessionId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/session/${sessionId}`)

  }
}
