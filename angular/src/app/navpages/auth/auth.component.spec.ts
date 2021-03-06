import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {auth} from 'firebase';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  const valueAngularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth',
    ['signInWithPopup', 'signOut']);

  valueAngularFireAuthSpy.signInWithPopup.withArgs(new auth.GoogleAuthProvider());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      schemas: [
       CUSTOM_ELEMENTS_SCHEMA
     ],
      providers: [
        {provide: AngularFireAuth, useValue: valueAngularFireAuthSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logout();
    expect(valueAngularFireAuthSpy.signOut).toHaveBeenCalled();
  });

  it('should login', () => {
    component.login();
    expect(valueAngularFireAuthSpy.signInWithPopup).toHaveBeenCalled();
  });
});
