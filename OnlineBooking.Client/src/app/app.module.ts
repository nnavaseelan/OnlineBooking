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
import {  AuthenticationService } from './services/authentication.service';
import {  Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DatePickerModule } from 'ng2-datepicker';
import {DataTableModule} from "angular2-datatable";
import { DatePipe } from '@angular/common';
import {DataFilterPipe} from "./data-filter.pipe";



@NgModule({
  declarations: [
    AppComponent,
    BookingcalendarComponent,LoginComponent, AdminComponent,DataFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DatePickerModule,
    DataTableModule,
    RouterModule.forRoot([
      { path: 'calendar', component: BookingcalendarComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      { path: '', redirectTo: 'calendar', pathMatch: 'full'},
      { path: '**', redirectTo: 'calendar', pathMatch: 'full'}
  ]),
    EJAngular2Module.forRoot()
  ],
  providers: [BookingserviceService,AuthenticationService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
