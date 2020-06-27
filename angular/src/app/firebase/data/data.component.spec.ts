import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataComponent } from './data.component';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from '@angular/fire/firestore';

import { of } from 'rxjs';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';



describe('DataComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,

      ],
      declarations: [
        DataComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [ AngularFirestore ],
    }).compileComponents();
  }));



  it('should create', () => {
    const fixture = TestBed.createComponent(DataComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
