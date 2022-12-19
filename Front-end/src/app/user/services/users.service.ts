import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';
import { Applicantrequest } from 'src/app/core/model/applicantrequest';
import { Participant } from 'src/app/core/model/participant';
import { User } from 'src/app/core/model/user';
import { Usertype } from 'src/app/core/model/usertype';
import { Volunteacher } from 'src/app/core/model/volunteacher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpclient: HttpClient) { }



  getUserByEmail(email: string): Observable<User> {
    return this._httpclient.get<User>(`${environment.url}${"vms/email?email="}${email}`).pipe(take(3))
  }



  registration(registerUser: Applicantrequest): Observable<Applicantrequest> {

    return this._httpclient.post<Applicantrequest>(`${environment.url}${"vms/applicant-requests"}`, registerUser).pipe(retry(3))
  }

  getUserType(id: number): Observable<Usertype> {
    return this._httpclient.get<Usertype>(`${environment.url}${"vms/user-types/"}${id}`).pipe(retry(3))
  }

  getEvents(): Observable<Event[]> {
    return this._httpclient.get<Event[]>(`${environment.url}${"vms/events?page=0"}`).pipe(retry(3))
  }

  sendOTP(email: string): Observable<User> {
    return this._httpclient.post<User>(`${environment.url}${"vms/send-otp?email="}${email}`, null).pipe(retry(3))
  }

  verifyOTP(otp: string, userId: number): Observable<boolean> {
    return this._httpclient.post<boolean>(`${environment.url}${"vms/verify-otp?otp="}${otp}${"&userid="}${userId}`, null).pipe(retry(3))
  }

  updatePassword(password: string, userId: number, oldPassword?: string) {
    if (oldPassword != null)
      return this._httpclient.post<boolean>(`${environment.url}${"vms/update-password?password="}${password}${"&userid="}${userId}${"&oldpassword="}${oldPassword}`, null).pipe(retry(3))
    else
      return this._httpclient.post<boolean>(`${environment.url}${"vms/update-password?password="}${password}${"&userid="}${userId}`, null).pipe(retry(3))
  }
  getAllUserType(): Observable<Usertype[]> {
    return this._httpclient.get<Usertype[]>(`${environment.url}${"vms/user-types"}`).pipe(retry(3))
  }

  saveVolunteacher(volunteacherId: number, volunteacher: Volunteacher): Observable<Volunteacher> {
    return this._httpclient.put<Volunteacher>(`${environment.url}${"vms/volunteachers/"}${volunteacherId}`, volunteacher).pipe(retry(3))
  }
}
