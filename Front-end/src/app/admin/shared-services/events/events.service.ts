import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Activity } from 'src/app/core/model/activity';
import { Event } from 'src/app/core/model/event';
import { Participant } from 'src/app/core/model/participant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  constructor(private http:HttpClient) { }

  addActivity(activity:Activity):Observable<Activity>
  {
    return this.http.post<Activity>(`${environment.url}${"vms/activities"}`,activity).pipe(retry(3))
  }

  getAllEvents(page:number):Observable<Event[]>
  {
    return this.http.get<Event[]>(`${environment.url}${"vms/all-events?page="}${page}`).pipe(retry(3))
    
  }

  downloadEvents():Observable<Object>
  {
    let header = {
      responseType: 'blob' as 'json',
      headers:new HttpHeaders({
      })
    }
    return this.http.get(`${environment.url}${"vms/events-download"}`,header)
  }
  getAllActivities(page:number):Observable<Activity[]>
  {
      return this.http.get<Activity[]>(`${environment.url}${"vms/activities?page="}${page}`).pipe(retry(3))
    
  }

  getEvent(id:number):Observable<Event>
  {
      return this.http.get<Event>(`${environment.url}${"vms/events/"}`+`${id}`).pipe(retry(3))
     
  }

  getEventById(eventId:number):Observable<Event>
  {
    return this.http.get<Event>(`${environment.url}${"vms/events/"}${eventId}`).pipe(retry(3))
  }

  addEvent(event:Event,ids:Number[]):Observable<Event>
  {
    let header={
      headers:new HttpHeaders({
        'activityIds':ids.toString()
      })
    }
    return this.http.post<Event>(`${environment.url}${"vms/events"}`,event,header).pipe(retry(3))
  }

  editEvent(eventId:number,event:Event,ids:Number[]):Observable<Event>
  {
    let header={
      headers:new HttpHeaders({
        'activityIds':ids.toString()
      })
    }
    return this.http.post<Event>(`${environment.url}${"vms/events"}`,event,header).pipe(retry(3))
  }

  addParticipant(participant:Participant):Observable<Participant>
  {
    return this.http.post<Participant>(`${environment.url}${"vms/participants"}`,participant).pipe(retry(3))
  }

  deleteEvent(id:number)
  {
    return this.http.delete(`${environment.url}${"vms/events/"}${id}`).pipe(retry(3))
  }

  deleteActivity(id:number)
  {
    return this.http.delete(`${environment.url}${"vms/activities/"}${id}`).pipe(retry(3))
  }

  getActivities():Observable<Activity[]>
  {
      return this.http.get<Activity[]>(`${environment.url}${"vms/all-activities"}`).pipe(retry(3))
      .pipe(retry(3))
  }

  getAllParticipantsByEvent(eventId:number):Observable<number>
  {
    return this.http.get<number>(`${environment.url}${"vms/total-participate-others?event="}${eventId}`).pipe(retry(3))
  }

  getActivityById(id:number):Observable<Activity>
  {
    return this.http.get<Activity>(`${environment.url}${"vms/activities/"}${id}`).pipe(retry(3))
  }

  updateActivity(activityId:number,activity:Activity):Observable<Activity>
  {
    return this.http.put<Activity>(`${environment.url}${"vms/activities/"}${activityId}`,activity).pipe(retry(3))
  }

  getEventsByProject(page:number,pid:number):Observable<Event[]>
  {
    return this.http.get<Event[]>(`${environment.url}${"vms/events-project?page="}${page}${"&project="}${pid}`).pipe(retry(3))
  }

  getEventsByVillage(page:number,vid:number):Observable<Event[]>
  {
    return this.http.get<Event[]>(`${environment.url}${"vms/events-village?page="}${page}${"&village="}${vid}`).pipe(retry(3))
  }

  getEventsByTime(page:number, month:number,year:number)
  {
    return this.http.get<Event[]>(`${environment.url}${"vms/events-time?page="}${page}${"&month="}${month}${"&year="}${year}`).pipe(retry(3))
  }
}
