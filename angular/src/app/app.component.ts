import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Label} from './label';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  items: Observable<any[]>;
  label: Label = {
    id: 1,
    name: 'Items'
  };
  result: Label = {
    id: 1,
    name: ''
  };
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
  }

  onClickMe(){
    this.result.name = this.label.name;
  }
  ngOnInit() {
  }
}
