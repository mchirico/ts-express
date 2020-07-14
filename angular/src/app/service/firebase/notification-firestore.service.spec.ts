import { TestBed } from '@angular/core/testing';

import { NotificationFirestoreService } from './notification-firestore.service';
import {DataService} from './pomodoro/data.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';


class SUB {
  endpoint =  'endpoint';
  expirationTime = 'expirationTime';
  keys = {p256dh: 'p256dh', auth: 'auth'};
  toJSON(): any  {
    return this;
  }

}

class TestDataService {
 addDataAny(data: any): any {

 }
}

const testDataService = new TestDataService();

describe('NotificationFirestoreService', () => {
  let service: NotificationFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [ {provide: DataService, useValue: testDataService} ],

    });
    service = TestBed.inject(NotificationFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can call addPushSubscriber', () => {


    const sub = new SUB();
    console.log(sub.toJSON().keys.p256dh);

    const data = {desc: 'desc', minutes: 3, action: 'action',
    uuid: 'uuid'};
    service.addPushSubscriber(sub, data).pipe(
      map(x => console.log(x))
    );
    expect(service).toBeTruthy();
  });
});
