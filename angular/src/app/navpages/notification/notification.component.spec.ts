import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SwPush, SwUpdate} from '@angular/service-worker';
import { NotificationComponent } from './notification.component';
import {NotificationPostService} from '../../service/notification-post.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';


class TestNotificationPostService{
  test = false;

  addPushSubscriber(sub: PushSubscription): Observable<object> {
    this.test = true;
    return of({body: 'data'});
  }
// TODO: Fix so don't need timeout
  get status(): boolean {
    return this.test;
  }
}



class TestSwUpdate {
  count = 0;
  message = '';
  get isEnabled(): boolean {
    this.count += 1;
    return false;
  }


  requestSubscription(options: object): Promise<PushSubscription>|Promise<string>{
    this.message = 'requestSubscription';
    return new Promise<string>((resolve, reject) => {
      resolve( 'Sample Data');
    });

  }

  get called(): number {
    return this.count;
  }

  get msg(): string {
    return this.message;
  }

}


describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  const testSwUpdate = new TestSwUpdate();
  const testNotificationService = new TestNotificationPostService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [
        { provide: SwUpdate, useValue: testSwUpdate },
        { provide: SwPush, useValue: testSwUpdate},
        {provide: HttpClient, useValue: testSwUpdate},
        { provide: NotificationPostService, useValue: testNotificationService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe', async () => {
    component.subscribeToNotifications();
    expect(testSwUpdate.msg).toEqual('requestSubscription');
    await setTimeout(() => {
      console.log('Status Complete');
      expect(testNotificationService.status).toBeTrue();

      }, 500);


  });
});
