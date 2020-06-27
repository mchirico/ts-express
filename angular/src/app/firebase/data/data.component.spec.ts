// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { DataComponent } from './data.component';
// import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from "@angular/fire/firestore";
// import {FirebaseApp} from "@angular/fire";
// import {Observable} from "rxjs";
//
//
// class AngularFirestoreStub implements AngularFirestore {
//   app: FirebaseApp;
//   firestore: any;
//   persistenceEnabled$: Observable<boolean>;
//
//   collection<T>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<T> {
//     return undefined
//   }
//
//
//   doc<T>(path: string): AngularFirestoreDocument<T> {
//     return undefined;
//   }
//
//   createId(): string {
//     return undefined;
//   }
// }
//
//
// describe('DataComponent', () => {
//   let component: DataComponent;
//   let fixture: ComponentFixture<DataComponent>;
//
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DataComponent ],
//       providers: [{provide: AngularFirestore, useClass: AngularFirestoreStub}],
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(DataComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
