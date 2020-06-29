import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { Page0Component } from './navpages/page0/page0.component';
import { Page1Component } from './navpages/page1/page1.component';
import { HomeComponent } from './navpages/home/home.component';
import { MainComponent } from './navpages/main/main.component';
import { AuthComponent } from './navpages/auth/auth.component';
import { NavbarComponent } from './navbars/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import { DataComponent } from './firebase/data/data.component';
import { SvgComponent } from './navpages/svg/svg.component';
import { InfoComponent } from './navpages/info/info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotificationComponent } from './navpages/notification/notification.component';
import {HttpClientModule} from '@angular/common/http';
import { PomodoroComponent, DialogComponent } from './navpages/pomodoro/pomodoro.component';


@NgModule({
  declarations: [
    AppComponent,
    Page0Component,
    Page1Component,
    HomeComponent,
    MainComponent,
    AuthComponent,
    NavbarComponent,
    DataComponent,
    SvgComponent,
    InfoComponent,
    NotificationComponent,
    PomodoroComponent, DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
