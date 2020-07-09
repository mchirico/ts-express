import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DataService} from './pomodoro/data.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationFirestoreService {

  constructor(public dataService: DataService) {
  }

  addPushSubscriber(sub: any, data: any): Observable<object> {
    console.log('2 wee!... made it!!', sub);
    this.dataService.addDataAny({endpoint: sub.endpoint,
      expirationTime: sub.expirationTime,
      p256dh: sub.toJSON().keys.p256dh,
      auth: sub.toJSON().keys.auth,
      desc: data.desc,
      minutes: data.minutes,
      action: data.action
    });

    // console.log('key p256dh', sub.toJSON().keys.p256dh);
    // console.log('key auth', sub.toJSON().keys.auth);
    return of({one: 'one'}, {two: 'two'});
  }

  send(): Observable<object> {
    return of({one: 'one'}, {two: 'two'});
  }

}
