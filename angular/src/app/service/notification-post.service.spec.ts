import { TestBed } from '@angular/core/testing';

import { NotificationPostService } from './notification-post.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';


class TestHttpClient{
  url = '';

  post(url: string, body: any | null, options?): Observable<object>{
    this.url = url;
    return of({body: 'post called'});
  }
  get urlCalled(): string {
    return this.url;
  }
}

describe('NotificationPostService', () => {
  let service: NotificationPostService;
  const testHttpClient = new TestHttpClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: testHttpClient }
      ]
    });
    service = TestBed.inject(NotificationPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addPushSubscriber', () => {
    service.addPushSubscriber('junk');
    expect(testHttpClient.urlCalled).toBe('/api/notifications');
  });

  it('should call send', () => {
    service.send();
    expect(testHttpClient.urlCalled).toBe('/api/newsletter');
  });

});
