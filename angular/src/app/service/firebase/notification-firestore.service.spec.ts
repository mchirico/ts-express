import { TestBed } from '@angular/core/testing';

import { NotificationFirestoreService } from './notification-firestore.service';

describe('NotificationFirestoreService', () => {
  let service: NotificationFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationFirestoreService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
