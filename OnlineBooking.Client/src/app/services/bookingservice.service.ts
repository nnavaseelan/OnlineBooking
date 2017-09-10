import { Injectable, } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class BookingserviceService {
  private mainUrl: string = "http://localhost:55200/api/";

  // private _movies: Observable<any[]>;
  constructor(public http: Http) { }


  GetBookings() {
    let myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
   
     let paramss: URLSearchParams = new URLSearchParams();
    paramss.append('date', '1986-11-06 00:00:00.000');
    paramss.append('startTime', '1986-11-06 00:00:00.000');
    paramss.append('endTime', '1986-11-06 00:00:00.000');
 
     let options = new RequestOptions({headers : myHeaders, search: paramss });
    
   return this.http.get("http://localhost:55200/api/booking/allowcount",{search:{'date': '1986-11-06 00:00:00.000','startTime': '1986-11-06 00:00:00.000','endTime': '1986-11-06 00:00:00.000'}}).map(res => res.json());
 //this.http.get("http://localhost:55200/api/booking/allowcount?date=1986-11-06 00:00:00.000&startTime=1986-11-06 00:00:00.000&endTime=1986-11-06 00:00:00.000").map(res => res.json()).subscribe(res => {
    // res.setHeader('Access-Control-Allow-Origin','*')
    
    
    
    
  }

  NewBooking(obj: object) {
    let dt = new Date(obj["StartTime"]);
    let dt2 = new Date(obj["EndTime"]);
    let start = dt.getHours().toString() + ":" + dt.getMinutes().toString();
    let end = dt2.getHours().toString() + ":" + dt2.getMinutes().toString();

    let item = { "name": obj["FullName"], "email": obj["Email"], "phone": obj["Phone"], "date": dt.getMonth().toString() + "-" + dt.getDay().toString() + "-" + dt.getFullYear().toString(), "startTime": obj["StartTime"], "endTime": obj["EndTime"] };
    let jString = JSON.stringify(item);
    debugger;
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.mainUrl + "booking/appointment", jString, options).toPromise().then(res => {

      alert("Appointment Created");
      console.log(res);
    });
    

  }

}
