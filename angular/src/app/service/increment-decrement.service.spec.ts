import { TestBed } from '@angular/core/testing';

import { IncrementDecrementService } from './increment-decrement.service';

describe('IncrementDecrementService', () => {
  let service: IncrementDecrementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncrementDecrementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
