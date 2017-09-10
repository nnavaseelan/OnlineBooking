import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EJAngular2Module } from 'ej-angular2'; 
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BookingcalendarComponent } from "app/bookingcalendar/bookingcalendar.component";
import { LoginComponent } from "app/login/login.component";
import {  BookingserviceService } from './services/bookingservice.service';
import {  Routes } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    BookingcalendarComponent,LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'calendar', component: BookingcalendarComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'calendar', pathMatch: 'full'},
      { path: '**', redirectTo: 'calendar', pathMatch: 'full'}
  ]),
    EJAngular2Module.forRoot()
  ],
  providers: [BookingserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
