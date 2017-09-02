import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { LoginComponent } from './login/login.component';
import { BookingcalendarComponent } from './bookingcalendar/bookingcalendar.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    BookingcalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: 'calendar', component: BookingcalendarComponent },
        { path: 'login', component: LoginComponent },
        { path: '', redirectTo: 'calendar', pathMatch: 'full'},
        { path: '**', redirectTo: 'calendar', pathMatch: 'full'}
    ]),
    ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
