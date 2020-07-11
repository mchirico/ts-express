import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DataService, Data} from '../../service/firebase/pomodoro/data.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import { v1 as uuid } from 'uuid';
import {DialogComponent} from './dialog.component';


export interface DialogData {
  minutes: number;
  name: string;
  tag: string;
  description: string;
  action: string;
  uuid: string;
}


@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<DialogData>();

  name: string;
  minutes: string;
  data: Data = {date: '', description: '', id: uuid(), minutes: 0, name: '', status: '', tag: '',
    timeStamp: undefined, action: 'active'};

  constructor(public dialog: MatDialog,
              public dataService: DataService,
              public fba: AngularFireAuth) {

  }
  login(): void {
    // Make sure domain is white listed on Firebase
    this.fba.signInWithPopup(new auth.GoogleAuthProvider());

  }

  logout(): void {
    this.fba.signOut();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {name: this.name,
        minutes: this.minutes,
      description: this.data.description,
      tag: this.data.tag}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data.tag = result.tag;
      this.data.description = result.description;
      console.log(`result.tag: ${result.tag}`);
      this.updateFirebase();
    });
  }

  sendMessage(data: DialogData): void {
    this.dataEvent.emit(data);
  }

  updateFirebase(): void {

    const timeStamp = new Date();
    this.data.name = this.name;
    this.data.minutes = parseInt(this.minutes, 10);
    this.data.timeStamp = timeStamp;
    this.data.date = timeStamp.toISOString();
    this.data.status = 'active';

    const emitData: DialogData = {action: 'active',
      name: this.name, description: this.data.description, minutes:
    this.data.minutes, tag: this.data.tag, uuid: uuid()};
    this.sendMessage(emitData);
  }


  ngOnInit(): void {
  }

}


