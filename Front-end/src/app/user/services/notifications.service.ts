import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Notification } from 'src/app/core/model/notification';
import { Participant } from 'src/app/core/model/participant';
import { Session } from 'src/app/core/model/session';
import { User } from 'src/app/core/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _httpclient: HttpClient) { }


  getNotifications(page: number, usertype: String): Observable<Notification[]> {

    let today: Date = new Date()
    return this._httpclient.get<Notification[]>(`${environment.url}${"vms/users-notifications?page="}${page}${"&month="}${today.getMonth() + 1}${"&year="}${today.getFullYear()}${"&usertype="}${usertype}`)
      .pipe(retry(3));
  }

  addVolunteacher(users: User[], sessionId: number): Observable<Session> {
    let header = {
      headers: new HttpHeaders({
        "sessionId": sessionId.toString()
      })
    }
    return this._httpclient.post<Session>(`${environment.url}${"vms/session-volunteachers"}`, users, header).pipe(retry(3));;
  }

  addVTParticipant(users: User[], eventId: number): Observable<Participant> {
    return this._httpclient.post<Participant>(`${environment.url}${"vms/user-participants?event="}${eventId}`, users).pipe(retry(3));
  }

  addNotification(notification: Notification): Observable<Notification> {
    return this._httpclient.post<Notification>(`${environment.url}${"vms/notifications"}`, notification).pipe(retry(3))
  }
}
