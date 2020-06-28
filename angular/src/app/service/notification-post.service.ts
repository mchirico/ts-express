import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationPostService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub: any): Observable<object> {
    return this.http.post('/api/notifications', sub);
  }

  send(): Observable<object> {
    return this.http.post('/api/newsletter', null);
  }
}
