
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { EJComponents } from 'ej-angular2';

@Component({
  selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
template: `
<div>
    <nav class='navbar navbar-default'>
        <div class='container-fluid'>
            <a class='navbar-brand'></a>
            <ul class='nav navbar-nav'>
                <li><a [routerLink]="['/calendar']">Booking Calendar</a></li>
                <li><a [routerLink]="['/login']">Login</a></li>
            </ul>
        </div>
    </nav>
    <div class='container'>
        <router-outlet></router-outlet>
    </div>
 </div>
`
})
export class AppComponent {
  title = 'app works!';

}
