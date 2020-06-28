import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SwPush, SwUpdate} from '@angular/service-worker';
import { NotificationComponent } from './notification.component';
import {NotificationPostService} from '../../service/notification-post.service';
import {HttpClient} from '@angular/common/http';

class TestSwUpdate {
  count = 0;
  get isEnabled(): boolean {
    this.count += 1;
    return false;
  }

  get called(): number {
    return this.count;
  }
}


describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  const testSwUpdate = new TestSwUpdate();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [
        { provide: SwUpdate, useValue: testSwUpdate },
        { provide: SwPush, useValue: testSwUpdate},
        {provide: HttpClient, useValue: testSwUpdate},
        { provide: NotificationPostService}
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
});
