import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';



export interface Data {
  name: string;
  minutes: number;
  timeStamp: Date;
  id: string;
  date: string;
  status: string;
  tag: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: Observable<Data>;
  now: Date;

  // private collection: AngularFirestoreCollection<Data>;
  private dataDoc: AngularFirestoreDocument<Data>;


  constructor(private afs: AngularFirestore) {
    // this.collection = afs.collection<Data>('pomodoro/mchirico/tasks')
    // this.data = this.collection.valueChanges();
    // this.now = new Date();

    this.dataDoc = afs.doc<Data>('pomodoro/mchirico/tasks/0');
    this.data = this.dataDoc.valueChanges();



  }
  addData(data: Data): void {

    this.dataDoc.set(data).catch(e => {
      console.log(e);
    });

  }
}
