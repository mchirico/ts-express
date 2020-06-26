import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AngularFirestore} from "@angular/fire/firestore";

// import {Observable} from "rxjs";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,

      ],
      declarations: [
        AppComponent
      ],
      providers: [ AngularFirestore ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular');
  });


});
