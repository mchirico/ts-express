import { TestBed } from '@angular/core/testing';

import {Data, DataService} from './data.service';
import {AngularFirestore} from '@angular/fire/firestore';

class TestFireStore {
  internalStatus: string[] = [];
  valueChanges(): void{
    this.internalStatus.push('valueChanges');
  }
  doc<T>(path: string): any {
    this.internalStatus.push('doc');
    this.internalStatus.push('path');
    return this;
  }

  set(data: any): Promise<void>|Promise<any>|void {
    this.internalStatus.push('data');
    return new Promise((resolve, reject) => {
      resolve('done..');
      // (new Error('Something awful happened'));
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: testFireStore}
      ]
    });
    service = TestBed.inject(DataService);

  });

  afterEach( () => {
    testFireStore.resetStatus();
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
});
