import { Component, OnInit  } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { BookingserviceService } from '../services/bookingservice.service';
import { BookingModel } from '../model/bookingmodel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
selectedValue;
date: DateModel;

find : string;
options: DatePickerOptions;
data:BookingModel[] = [];
  constructor(public authService:AuthenticationService, public bookingService:BookingserviceService) {
    this.find = "";
    
    this.authService.checkCredentials();
    this.options = new DatePickerOptions();
   this.bookingService.GetAllBookings().subscribe(res => {
     setTimeout(()=> {
        this.data = res;
        console.log(this.data[0].StartTime);
      }, 1000);
    
   });
    
  }

  FilterBookings()
  {
    
  this.find = this.date.formatted;
  }

  ngOnInit() {
    
  }

  OnChangeStatus(value, index) {
    let booking:BookingModel = this.data[index];
    booking.Status = value
    this.bookingService.NewBooking(booking);

}
 

}
