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


  it('should be minimum', () => {
    service.value = service.min - 1;
    service.decrement();
    expect(service.message).toEqual('Minimum reached!');
    expect(service.value).toEqual(service.min - 1);
    service.increment();
    expect(service.value).toEqual(service.min );
    expect(service.message).toEqual(
      `You have ${service.max - service.value} before max`
    );


  });
  it('should be maximum', () => {
    service.value = service.max + 1;
    service.increment();
    expect(service.message).toEqual('Maximum reached!');
    expect(service.value).toEqual(service.max + 1);
    service.decrement();
    expect(service.value).toEqual(service.max );
    expect(service.message).toEqual('');

  });
});
