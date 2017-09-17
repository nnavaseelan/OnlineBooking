import { Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { EJComponents } from 'ej-angular2';
import { DatePipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class BookingserviceService {
  private mainUrl: string = "http://localhost:50300/api/";

  
  constructor(public http: Http, public datePipe:DatePipe,public toastr: ToastsManager) {

    
   }

  GetBookingsCount(sDate = "start", eDate = "end") {
    if (sDate == "start")
    {
     let sd = new Date();
      sd.setDate(sd.getDate() - 1);
      sDate =  this.datePipe.transform(sd.toString(), 'short');
      let ed = new Date();
      ed.setDate(ed.getDate() + 7);
      eDate =  this.datePipe.transform(ed.toString(), 'short');

    }
    let myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    let obj: object = { 'startTime': sDate, 'endTime': eDate };
    return this.http.get(this.mainUrl + "booking/allowcount", { search: obj }).map(res => res.json());
  }

   GetSlotCount(sDate) {
    let myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    let dt = new Date(sDate);
    let start =  this.datePipe.transform(dt.toString(), 'short');
    let obj: object = { 'startTime': start};
    return this.http.get(this.mainUrl + "booking/checkslots", { search: obj }).map(res => res.json());

  }

  GetAllBookings(all:boolean = true) {
    if (all)
    {
    let myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    let dt = new Date();
    dt.setDate(dt.getDate() - 1);
    let dtStart= this.datePipe.transform(dt.toString(), 'short');
    let dt2 = new Date();
    dt2.setDate(dt.getDate() + 7);
    let dtEnd =  this.datePipe.transform(dt2.toString(), 'short');
    let obj: object = { 'startTime': dtStart, 'endTime': dtEnd };
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
          this.GetSlotCount(obj["StartTime"]).subscribe(res => {
            if (parseInt(res) == 0)
            {
            this.http.post(this.mainUrl + "booking/appointment", jString, options).toPromise().then(res => {
            var schObj = $("#Schedule1").data("ejSchedule");
            obj["StartTime"] = new Date(obj["StartTime"]);
            obj["EndTime"] = new Date(obj["EndTime"]);
            schObj.saveAppointment(obj);
            
            let count: number = parseInt(localStorage.getItem("appcount"));
            if (localStorage.getItem("appcount") == null) {
              count = 0;
            }
            localStorage.setItem("appcount", (count + 1).toString());
            this.toastr.success('Created new appointment Successfully', 'Success!', {positionClass:'toast-top-center',newestOnTop:true, toastLife:5000, animate:'flyLeft'});
           

          });
            }
            else {
              this.toastr.warning("Please Select different slot. There are appointments already exists wiyhin same time interval", 'Alert!', {positionClass:'toast-top-center',newestOnTop:true, toastLife:5000, animate:'flyLeft'});
            }
          });
          
        }
        else {
             this.toastr.success('Appointment Updated Successfully', 'Success!', {positionClass:'toast-top-center',newestOnTop:true, toastLife:5000, animate:'flyLeft'});
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
