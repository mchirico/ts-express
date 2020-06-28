import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Page0Component} from './navpages/page0/page0.component';
import {Page1Component} from './navpages/page1/page1.component';
import {HomeComponent} from './navpages/home/home.component';
import {MainComponent} from './navpages/main/main.component';
import {AuthComponent} from './navpages/auth/auth.component';
import {InfoComponent} from './navpages/info/info.component';
import {SvgComponent} from './navpages/svg/svg.component';
import {NotificationComponent} from './navpages/notification/notification.component';



const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'main', component: MainComponent},
  {path: 'page0', component: Page0Component},
  {path: 'page1', component: Page1Component},
  {path: 'info', component: InfoComponent},
  {path: 'notification', component: NotificationComponent},
  {path: 'svg', component: SvgComponent},
  {path: 'auth', component: AuthComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
