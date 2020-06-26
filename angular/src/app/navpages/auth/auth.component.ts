import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {auth} from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {

  }

  login() {
    // Make sure domain is white listed on Frebase
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // this.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

  ngOnInit(): void {
  }
}
