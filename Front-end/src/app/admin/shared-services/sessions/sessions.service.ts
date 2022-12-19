import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Attendance } from 'src/app/core/model/attendance';
import { Content } from 'src/app/core/model/content';
import { Notification } from 'src/app/core/model/notification';
import { Session } from 'src/app/core/model/session';
import { Sessionreport } from 'src/app/core/model/sessionreport';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private httpclient: HttpClient) { }


  getNotifications(page: number, month: number, year: number, usertype: String): Observable<Notification[]> {
    return this.httpclient.get<Notification[]>(`${environment.url}${"vms/notifications?page="}${page}${"&month="}${month}${"&year="}${year}${"&usertype="}${usertype}`)
      .pipe(retry(3));
  }

  downloadSessions(): Observable<Object> {
    let header = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
      })
    }
    return this.httpclient.get(`${environment.url}${"vms/sessions-download"}`, header).pipe(retry(3))
  }

  getSessionsByMonthAndYear(page: number, month: number, year: number): Observable<Session[]> {
    return this.httpclient.get<Session[]>(`${environment.url}${"vms/sessions?page="}${page}${"&month="}${month}${"&year="}${year}`)
      .pipe(retry(3))
  }

  sessionById(sessionId: number): Observable<Session> {
    return this.httpclient.get<Session>(`${environment.url}${"vms/sessions/"}${sessionId}`).pipe(retry(3))
  }

  addSessionReporting(sessionReporting: Sessionreport) {
    return this.httpclient.post<Session>(`${environment.url}${"vms/session-reports"}`, sessionReporting).pipe(retry(3))
  }
  addSession(session: Session): Observable<Session> {
    return this.httpclient.post<Session>(`${environment.url}${"vms/sessions/"}`, session).pipe(retry(3))
  }

  editSession(sessionId: number, session: Session): Observable<Session> {
    return this.httpclient.put<Session>(`${environment.url}${"vms/sessions/"}${sessionId}`, session).pipe(retry(3))
  }
  deleteSession(id: number) {
    return this.httpclient.delete(`${environment.url}${"vms/sessions/"}${id}`).pipe(retry(3))
  }

  getAllSessions(page: number): Observable<Session[]> {
    return this.httpclient.get<Session[]>(`${environment.url}${"vms/all-sessions?page="}${page}`).pipe(retry(3))
  }

  getAllSessionReportsBySession(page: number, id: number): Observable<Sessionreport[]> {
    return this.httpclient.get<Sessionreport[]>(`${environment.url}${"vms/session-reports?page="}${page}${"&sessionId="}${id}`).pipe(retry(3))
  }

  deleteSessionReport(id: number) {
    return this.httpclient.delete(`${environment.url}${"vms/session-reports/"}${id}`).pipe(retry(3))
  }

  getKidsAttendance(gid: number, sid: number): Observable<Attendance[]> {
    return this.httpclient.get<Attendance[]>(`${environment.url}${"vms/attendance?groupId="}${gid}${"&sessionId="}${sid}`).pipe(retry(3))
  }


  addContent(content: Content): Observable<Content> {
    return this.httpclient.post<Content>(`${environment.url}${"vms/contents"}`, content).pipe(retry(3))
  }

  getContentByGroup(id: number): Observable<Content> {
    return this.httpclient.get<Content>(`${environment.url}${"vms/contents/"}${id}`).pipe(retry(3))
  }

  getAllContents(): Observable<Content[]> {
    return this.httpclient.get<Content[]>(`${environment.url}${"vms/contents"}`).pipe(retry(3))
  }

  getSessionsByProject(page: number, pid: number): Observable<Session[]> {
    return this.httpclient.get<Session[]>(`${environment.url}${"vms/sessions-project?page="}${page}${"&project="}${pid}`).pipe(retry(3))
  }

  getSessionsByVillage(page: number, vid: number): Observable<Session[]> {
    return this.httpclient.get<Session[]>(`${environment.url}${"vms/sessions-village?page="}${page}${"&village="}${vid}`).pipe(retry(3))
  }


}
