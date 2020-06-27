import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public fba: AngularFireAuth) {

  }

  login(): void {
    // Make sure domain is white listed on Firebase
    this.fba.signInWithPopup(new auth.GoogleAuthProvider());
    // this.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout(): void {
    this.fba.signOut();
  }

  ngOnInit(): void {
  }
}
