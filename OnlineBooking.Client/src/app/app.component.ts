
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { EJComponents } from 'ej-angular2';
import { BookingserviceService } from './services/bookingservice.service';
import {AuthenticationService} from './services/authentication.service';
@Component({
    selector: 'app-root',
    //   templateUrl: './app.component.html',
    //   styleUrls: ['./app.component.css']
    template: `
<div>
    <nav class='navbar navbar-default'>
        <div class='container-fluid'>
            <a class='navbar-brand'></a>
            <ul class='nav navbar-nav' style = 'float:left'>
                <li><a [routerLink]="['/calendar']">Booking Calendar</a></li>
                <li *ngIf = '!LoggedIn()'><a [routerLink]="['/login']">Login</a></li>
                
            </ul>
            <ul class='nav navbar-nav' style = 'float:right'>
                <li *ngIf = 'LoggedIn()'><a (click)="Logout()" [routerLink]="['/']">Logout</a></li>
    
                
            </ul>
        </div>
    </nav>

    <div class='container'>
    <div class = 'appcounts'>Total Appointments : {{getAppCount()}}</div>
        <router-outlet></router-outlet>
    </div>
 </div>
`,
styles : [`
.appcounts {
    padding: 5px 0px 10px 0px;
}`]
})
export class AppComponent {
    title = 'app works!';
    loggedIn = false;
   constructor (public auth:AuthenticationService)
   {
    
   }
    getAppCount() {

        let val = localStorage.getItem("appcount");
        
        if (val == null) {
         return 0;
        }
        return val;
    }

    LoggedIn() {
      if (localStorage.getItem('user'))
      {
        
          return true;
      }

     return false;   
    }

    Logout()
    {
      this.auth.logout();
      console.log("fjfjfjfjfjfjffjdj");
    }
    
}
