import { Component, OnInit } from '@angular/core';
import {AuthenticationService, User} from '../services/authentication.service';
@Component({
  selector: 'booking-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   public user = new User('','');
    public errorMsg = '';
 
    constructor(
        private _service:AuthenticationService) {}
 
    login() {
         this.errorMsg = '';
        if(!this._service.login(this.user)){
            this.errorMsg = 'Failed to login';
        }
    }

}


