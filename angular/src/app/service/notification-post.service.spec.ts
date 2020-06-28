import { TestBed } from '@angular/core/testing';

import { NotificationPostService } from './notification-post.service';

describe('NotificationPostService', () => {
  let service: NotificationPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationPostService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
