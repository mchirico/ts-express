import { TestBed } from '@angular/core/testing';

import {Data, DataService} from './data.service';
import {AngularFirestore} from '@angular/fire/firestore';

class TestFireStore {
  internalStatus: string[] = [];
  errorOnSet = false;
  valueChanges(): void{
    this.internalStatus.push('valueChanges');
  }
  doc<T>(path: string): any {
    this.internalStatus.push('doc');
    this.internalStatus.push('path');
    return this;
  }

  ErrorSet(): void{
    this.errorOnSet = true;
  }

  ErrorUnSet(): void{
    this.errorOnSet = false;
  }

  set(data: any): Promise<void>|Promise<any>|void {
    this.internalStatus.push('data');

    if (this.errorOnSet) {
      return new Promise((resolve, reject) => {
        reject( new Error('Something awful happened on set'));
      });
    }

    return new Promise((resolve, reject) => {
      resolve('done..');
    });

  }

  get status(): string[] {
    return this.internalStatus;
  }

  resetStatus(): void {
    this.internalStatus = [];
  }
}


describe('DataService', () => {
  let service: DataService;
  const testFireStore = new TestFireStore();
  const originalConsoleError = console.error;
  const stack: string[] = [];



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: testFireStore}
      ]
    });

    service = TestBed.inject(DataService);
    console.error = (msg) => stack.push(msg);

  });

  afterEach( () => {
    testFireStore.resetStatus();
    console.error = originalConsoleError;
    testFireStore.ErrorUnSet();
    // Clear out
    stack.splice(0, stack.length);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(testFireStore.status).toEqual(['doc', 'path', 'valueChanges']);
  });

  it('should addData', () => {
    const data: Data = {
      name: 'name',
      minutes: 3,
      timeStamp: new Date(),
      id: 'id',
      date: 'date',
      status: 'status',
      tag: 'tag',
      description: 'description',
      action: 'action',
    };


    service.addData(data);
    console.log('done: ', testFireStore.status);
    expect(testFireStore.status).toEqual(['doc', 'path', 'valueChanges', 'data']);

  });

  it('should addDataAny', () => {
    const data: Data = {
      name: 'name',
      minutes: 3,
      timeStamp: new Date(),
      id: 'id',
      date: 'date',
      status: 'status',
      tag: 'tag',
      description: 'description',
      action: 'action',
    };


    service.addDataAny(data);
    console.log('done: ', testFireStore.status);
    expect(testFireStore.status).toEqual(['doc', 'path', 'valueChanges', 'data']);

  });

  // You need async here, to wait for error message
  it('should erro on addData', async () => {

    const data: Data = {
      name: 'name',
      minutes: 3,
      timeStamp: new Date(),
      id: 'id',
      date: 'date',
      status: 'status',
      tag: 'tag',
      description: 'description',
      action: 'action',
    };

    testFireStore.ErrorSet();
    await service.addData(data);
    expect(stack).toContain('Something awful happened on set');


  });

  // You need async here, to wait for error message
  it('should erro on addDataAny', async () => {

    const data: Data = {
      name: 'name',
      minutes: 3,
      timeStamp: new Date(),
      id: 'id',
      date: 'date',
      status: 'status',
      tag: 'tag',
      description: 'description',
      action: 'action',
    };

    testFireStore.ErrorSet();
    await service.addDataAny(data);
    expect(stack).toContain('Something awful happened on set');


  });
});

describe('using bind with jasmine', () => {

  class F {
    testError(x): void {
      if (x === 2) {
        throw new Error();
      }
    }
  }


  it('lets us avoid using an anonymous function', () => {
    const f = new F();
    expect(() => {f.testError(2); }).toThrow();
  });

});
