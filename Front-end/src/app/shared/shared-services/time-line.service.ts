import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Timelinepost } from 'src/app/core/model/timelinepost';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeLineService {

  constructor(private _httpclient:HttpClient) { }
  
  getTimelinePosts(page:number):Observable<Timelinepost[]>{
    return this._httpclient.get<Timelinepost[]>(`${environment.url}${"vms/posts?page="}${page}`).pipe(retry(3))
  
  }

  createTimelinePost(post:Timelinepost):Observable<Timelinepost>
  {
    return this._httpclient.post<Timelinepost>(`${environment.url}${"vms/posts"}`,post).pipe(retry(3))
  }

  deleteTimelinePost(id:number)
  {
    return this._httpclient.delete(`${environment.url}${"vms/posts/"}${id}`).pipe(retry(3))
  }
}
