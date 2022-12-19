import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { catchError, delay, retry, retryWhen, scan } from 'rxjs/operators';
import { Announcement } from 'src/app/core/model/announcement';
import { Sessionreport } from 'src/app/core/model/sessionreport';
import { Volunteacher } from 'src/app/core/model/volunteacher';
import { environment } from 'src/environments/environment';
import {Notification} from '../../.../../core/model/notification'
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  deleteAnnouncement(id:number)
  {
    return this.http.delete(`${environment.url}${"vms/announcements/"}${id}`).pipe(retry(3))
  }

  getTotalvolunteachers()
  {
    return this.http.get<number>(`${environment.url}${"vms/total-volunteachers"}`).pipe(retry(3))
  }

  getTotalKids()
  {
    return this.http.get<number>(`${environment.url}${"vms/total-kids"}`).pipe(retry(3))
  }

  getTotalSesssions()
  {
    return this.http.get<number>(`${environment.url}${"vms/total-sessions"}`).pipe(retry(3))
  }

  getTotalEvents()
  {
    return this.http.get<number>(`${environment.url}${"vms/total-events"}`).pipe(retry(3))
  }

  getAdminNotifications(page: number):Observable<Notification[]>
  {
    return this.http.get<Notification[]>(`${environment.url}${"vms/admin-notifications?page="}${page}`).pipe(retry(3))
  }

  getNewUsers(page:number):Observable<Volunteacher[]>
  {
    return this.http.get<Volunteacher[]>(`${environment.url}${"vms/new-volunteachers?page="}${page}`).pipe(retry(3))
  }

  getRequirements():Observable<Sessionreport[]>
  {
    return this.http.get<Sessionreport[]>(`${environment.url}${"vms/sessions-requirenments"}`).pipe(retry(3))
  }

  addAnnouncement(announcement:Announcement):Observable<Announcement>
  {
    return this.http.post<Announcement>(`${environment.url}${"vms/announcements"}`,announcement).pipe(retry(3))
  }
}


