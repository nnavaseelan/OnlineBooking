import { Injectable, } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { EJComponents } from 'ej-angular2';
import { DatePipe } from '@angular/common';

@Injectable()
export class BookingserviceService {
  private mainUrl: string = "http://localhost:50300/api/";

  // private _movies: Observable<any[]>;
  constructor(public http: Http, public datePipe:DatePipe) { }


  GetBookingsCount(sDate = "2000-11-06 00:00:00.000", eDate = "2030-11-06 00:00:00.000") {
    let myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    let obj: object = { 'startTime': sDate, 'endTime': eDate };
    return this.http.get(this.mainUrl + "booking/allowcount", { search: obj }).map(res => res.json());

  }

  GetAllBookings(all:boolean = true) {
    if (all)
    {
    let myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    let obj: object = { 'startTime': '2000-11-06 00:00:00.000', 'endTime': '2030-11-06 00:00:00.000' };
    return this.http.get(this.mainUrl + "booking/bookinglist", { search: obj }).map(res => res.json());
   }
  
  else
  {
    let dt = new Date();
     dt.setDate(dt.getDate() - 1);
    let dtStart= this.datePipe.transform(dt.toString(), 'short');
    let dt2 = new Date();
    dt2.setDate(dt.getDate() + 7);
    let dtEnd =  this.datePipe.transform(dt2.toString(), 'short');
    let myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    let obj: object = { 'startTime': dtStart, 'endTime': dtEnd };
    return this.http.get(this.mainUrl + "booking/bookinglist", { search: obj }).map(res => res.json());
  }
  

  }

  NewBooking(obj: object) {
    console.log(obj["Id"]);
    let item = { "name": obj["Name"], "email": obj["Email"], "phone": obj["Phone"], "date": obj["StartTime"], "startTime": obj["StartTime"], "endTime": obj["EndTime"] };
    let jString = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    if (obj["Id"] == "") {
      let options = new RequestOptions({ headers: headers });

      this.GetBookingsCount(obj["StartTime"], obj["EndTime"]).subscribe(res => {

        if (parseInt(res) < 10) {
          this.http.post(this.mainUrl + "booking/appointment", jString, options).toPromise().then(res => {
            var schObj = $("#Schedule1").data("ejSchedule");
            obj["StartTime"] = new Date(obj["StartTime"]);
            obj["EndTime"] = new Date(obj["EndTime"]);
            schObj.saveAppointment(obj);
            alert("Appointment Created");
            let count: number = parseInt(localStorage.getItem("appcount"));
            if (localStorage.getItem("appcount") == null) {
              count = 0;
            }
            localStorage.setItem("appcount", (count + 1).toString());


          });
        }
        else {
          alert("Maximum 10 Appointments Accepted");
        }
        $("#customWindow").ejDialog("close");
      });
    }

    else {
      let param = { 'id': obj["Id"] };
      let options = new RequestOptions({ headers: headers, params: param });


      this.http.post(this.mainUrl + "booking/updateappointment", jString, options).toPromise().then(res => {

        alert("Appointment Updated");

      })

    }

  }

}
