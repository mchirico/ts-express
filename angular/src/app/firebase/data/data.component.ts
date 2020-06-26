import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Gmail {
  msg: string;
  timeStamp: Date;
  id: number;
  date?: string;
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  data: Observable<any[]>;
  now: Date;

  private collection: AngularFirestoreCollection<Gmail>;


  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Gmail>('gmail/possible/summary');
    this.data = this.collection.valueChanges();
    this.now = new Date();
  }

  ngOnInit(): void {
  }

}
