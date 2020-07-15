import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NavbarComponent} from './navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatMenuModule} from '@angular/material/menu';
import {Location} from '@angular/common';

import {Router, Routes} from '@angular/router';
import {HomeComponent} from '../../navpages/home/home.component';


const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'main', component: HomeComponent},
  {path: 'page0', component: HomeComponent},
  {path: 'page1', component: HomeComponent},
  {path: 'info', component: HomeComponent},
  {path: 'notification', component: HomeComponent},
  {path: 'fbnotification', component: HomeComponent},
  {path: 'pomodoro', component: HomeComponent},
  {path: 'svg', component: HomeComponent},
  {path: 'auth', component: HomeComponent},


];


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatMenuModule,
      ],
      declarations: [NavbarComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {

    const myDictionary: { [index: string]: any; } = {
      '': '/main',
      home: '/home',
      page0: '/page0',
      page1: '/page1',
      info: '/info',
      notification: '/notification',
      fbnotification: '/fbnotification',
    };
    for (const key in myDictionary) {
      if (myDictionary.hasOwnProperty(key)) {
        const value = myDictionary[key];
        console.log(key, value);

        router.navigate([key]);
        tick();
        expect(location.path()).toBe(value);
      }
    }


  }));

  it('actual calls', fakeAsync(() => {


    const expectedArray = [
      ['Home', '/home'],
      ['Main', '/main'],
      ['Info', '/info'],
      ['Page0', '/page0'],
      ['Page1', '/page1'],
      ['SVG', '/svg'],
      ['Auth', '/auth'],
      ['Notification', '/notification'],
      ['Pomodoro', '/pomodoro'],
      ['FB-Notification', '/fbnotification'],
    ];
    expectedArray.forEach((value, index) => {

      component.navigateMenu(value[0]);
      tick();
      expect(location.path()).toBe(value[1]);

      console.log(index);
      console.log(value[0], value[1]);
    });


  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
