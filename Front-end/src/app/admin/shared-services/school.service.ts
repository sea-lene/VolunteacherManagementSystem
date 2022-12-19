import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Requirement } from 'src/app/core/model/requirement';
import { School } from 'src/app/core/model/school';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getAllSchool(page: number): Observable<School[]> {
    return this.http.get<School[]>(`${environment.url}${"vms/schools?page="}${page}`).pipe(retry(3))
  }

  getAllRequirements(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${environment.url}${"vms/requirements"}`).pipe(retry(3))
  }

  addSchool(school: School): Observable<School> {
    return this.http.post<School>(`${environment.url}${"vms/schools"}`, school).pipe(retry(3))
  }

  editSchool(schoolId: number, school: School): Observable<School> {
    return this.http.put<School>(`${environment.url}${"vms/schools/"}${schoolId}`, school).pipe(retry(3))
  }

  deleteSchool(id: number) {
    return this.http.delete(`${environment.url}${"vms/schools/"}${id}`).pipe(retry(3))
  }

  getSchoolById(schoolId): Observable<School> {
    return this.http.get<School>(`${environment.url}${"vms/schools/"}${schoolId}`).pipe(retry(3))
  }

  downloadSchools(): Observable<Object> {
    let header = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
      })
    }
    return this.http.get(`${environment.url}${"vms/schools-download"}`, header).pipe(retry(3))
  }
}
