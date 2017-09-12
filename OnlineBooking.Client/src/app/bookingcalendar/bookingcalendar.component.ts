import { Component, OnInit } from '@angular/core';
import { EJComponents } from 'ej-angular2';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BookingserviceService } from '../services/bookingservice.service';
import { BookingModel } from '../model/bookingmodel';

@Component({
  selector: 'booking-bookingcalendar',
  templateUrl: './bookingcalendar.component.html',
  styleUrls: ['./bookingcalendar.component.css']
})

export class BookingcalendarComponent implements OnInit {
  public scheduleIteratons : number = 0;
  public appoitmentCount:string;
  public scheduleData: BookingModel[] = [];
  public showCalender : boolean = true;
  public minDate:Date;
  ngOnInit(): void {
    
  }
  
  constructor(public bookingService:BookingserviceService, public http:Http) {
  this.updateappcounts();
this.minDate = new Date(Date.now());
  this.bookingService.GetAllBookings().subscribe(res => {
     this.scheduleData  = res;
     let vals:number[] = [];
     for(let i = this.scheduleData.length - 1; i >= 0; i--) 
     {
         if (this.scheduleData[i].Status == 1 || this.scheduleData[i].Status == 2)
         {
            this.scheduleData[i].Recurrence = false;
            this.scheduleData[i].Categorize = "1,3";
            this.scheduleData[i].AllDay = false;
            this.scheduleData[i].Description = "";
        
        }
        else
        {
           
          this.scheduleData.splice(i,1);

           // this.scheduleData.splice(this.scheduleData.indexOf(element),1);
        }
        
     }
        
     });
     
     
     //debugger;
    
 

    // this.dataManager = ej.DataManager({
    //     // get the required appointments from service
    //     url: "http://js.syncfusion.com/ejServices/api/Schedule/LoadCurrentData",
    //     // enable cross domain
    //     crossDomain: true
    // });
     
//   this.scheduleData = [{
//           Id: 100, 
//           FullName: "Sea Gold", 
//           StartTime: new Date(2017,9,7, 10, 0),
//           EndTime: new Date(2017,9,7, 13, 0), 
//           Description: "", 
//           AllDay: false, 
//           Recurrence: false,
//           Categorize: "1,3",         
//           Email:"navaseelan4u@gmail.com",
//           Phone:"0774475196"
         
//       },
//       {
//           Id: 101,
//           FullName: "Bering Sea Gold", 
//           StartTime: new Date(2017, 9,5, 9, 0),
//           EndTime: new Date(2017, 9,5, 12, 30), 
//           Description: "",
//            AllDay: false, 
//            Recurrence: false, 
//            Categorize: "2,5",          
//            Email:"navaseelan4u@gmail.com",
//            Phone:"0774475196"
//       },
//       {
//           Id: 102, 
//           FullName: "What Happened Next?", 
//           StartTime: new Date(2017, 9, 6,8, 0),
//           EndTime: new Date(2017, 9, 6, 14, 30), 
//           Description: "", 
//           AllDay: false, 
//           Recurrence: false, 
//           Categorize: "3,6",         
//           Email:"navaseelan4u@gmail.com",
//           Phone:"0774475196"
//       }];

  }

   SetSchedularLayout(args: any) {
       /*
        switch (args.requestType) {
    
            case "leftindentcells":
                args.element.css("background-color", "#0c0000");
                break;
            case "emptytd":
                args.element.css("background-color", "#d20000");
                args.element.css("border-color", "#faa41a");
                break;
        }
        */
    }

  updateappcounts()
  {
    this.bookingService.GetBookingsCount().subscribe(res=>{this.appoitmentCount = res;
    localStorage.setItem("appcount",this.appoitmentCount);
    });
    
  }

  

  onCellClick(args) {
    args.cancel = true;  // Prevents inline appointment creation on clicking the cells.
    this.onAppointmentWindowOpen(args);
 }
  

  public recurRule;

  // This function executes before the default appointment window opens
  onAppointmentWindowOpen(args: any): void {
      $("#customerId").val('');
      args.cancel = true; // prevents the display of default appointment window
      // defining recurrence editor control to be used as custom appointment window
      $("#recurrenceEditor").ejRecurrenceEditor({ selectedRecurrenceType: 0, frequencies: ["daily", "weekly", "monthly", "yearly", "everyweekday"] });
     // $("#recurrence").ejCheckBox({ change: this.recurCheck });
      var schObj = $("#Schedule1").data("ejSchedule");
      this.showCalender = true;
      // When double clicked on the Scheduler cells, fills the StartTime and EndTime fields appropriately
      $("#StartTime").ejDateTimePicker({ value: args.startTime });
      $("#EndTime").ejDateTimePicker({ value: args.endTime });
      $("#recWindow").css("display", "none");
      $("#appWindow").css("display", "");

      if (!ej.isNullOrUndefined(args.target)) {
          // When double clicked on the Scheduler cells, if the target is allday or month cells – only then enable check mark on the allday checkbox
          if ($(args.target.currentTarget).hasClass("e-alldaycells") || (args.startTime.getHours() == 0 && args.endTime.getHours() == 23))
              $("#allday").prop("checked", true);
          else
              args.model.currentView == "month" ? $("#allday").prop("checked", true) : $("#allday").prop("checked", false);
          // If the target is allday or month cells – disable the StartTime and EndTime fields
          $("#StartTime,#EndTime").ejDateTimePicker({
              enabled: ($(args.target.currentTarget).hasClass("e-alldaycells") || (args.startTime.getHours() == 0 && args.endTime.getHours() == 23) || $(args.target.currentTarget).hasClass("e-monthcells") || args.model.currentView == "month") ? false : true
          });
      }
      // If double clicked on the appointments, fill the custom appointment window fields with appropriate values.
      if (!ej.isNullOrUndefined(args.appointment)) {    
          this.showCalender = false;      
          $("#customerId").val(args.appointment.Id);          
          $("#name").val(args.appointment.Name);
          $("#emailId").val(args.appointment.Email);
          $("#phoneNo").val(args.appointment.Phone);
          $("#StartTime").ejDateTimePicker({ value: new Date(args.appointment.StartTime) });
          
          $("#EndTime").ejDateTimePicker({ value: new Date(args.appointment.EndTime) });
          // Fills the Appointment type dropdown with its value
          var value = args.appointment.AppointmentType;
          $("#AppointmentType").ejDropDownList("clearText");
          $("#AppointmentType").ejDropDownList({
              text: value,
              value: value
          });
          $("#allday").prop("checked", args.appointment.AllDay);
          $("#recurrence").ejCheckBox({ checked: args.appointment.Recurrence });
          console.log(args.appointment.Recurrence);
          if (args.appointment.Recurrence) {

              $("#edittr").css("display", "");
              $("#recsummary").html(args.appointment.RecurrenceRule);
              $("#summarytr").css("display", "");
              var recObj = $("#recurrenceEditor").ejRecurrenceEditor('instance');
              recObj._recRule = args.appointment.RecurrenceRule; // app recurrence rule is stored in Recurrence editor object
              recObj.recurrenceRuleSplit(args.appointment.RecurrenceRule, args.appointment.recurrenceExDate); //splitting the recurrence rule
              recObj.showRecurrenceSummary(args.appointment.Id); // updating the recurrence rule in Recurrence editor
             
        }
      }
      $("#customWindow").ejDialog("open");
  }

  save() {
      // checks if the  value is not left blank before saving it.
      let name = $.trim($("#name").val());
      let email = $.trim($("#emailId").val());
      let phone = $.trim($("#phoneNo").val());

      if (name == "") {
          $("#name").addClass("error");
          debugger;
          return false;
      }
      if (email == "") {
            $("#emailId").addClass("error");
            return false;
        }
        
      if (phone == "") {
            $("#phoneNo").addClass("error");
            return false;
        }
     
      //let newId  =  this.scheduleData[this.scheduleData.length-1].Id;
    
      var obj = {Id: $("#customerId").val(), 
          Name: name, 
          StartTime: $("#StartTime").val(),
          EndTime: $("#EndTime").val(), 
          Description: "", 
          AllDay: false, 
          Recurrence: false,
          Categorize: "1,3",         
          Email:email,
          Phone:phone};
    
    //var formelement = $("#customWindow").find("#custom").get(0);
    // looping through the custom form elements to get each value and form a JSON object
    //   for (var index = 0; index < formelement.length; index++) {
    //       var columnName = formelement[index].name, $element = $(formelement[index]);
    //       if (columnName != undefined) {
    //           if (columnName != "" && obj[columnName] == null) {
    //               var value = formelement[index].value;
    //               if (columnName == "Id" && value != "") {
    //                   value = parseInt(value);
    //               }
    //               if ($element.hasClass("e-datetimepicker")) {
    //                   value = new Date(value);
    //               }
    //               if (formelement[index].type == "checkbox") {
    //                   value = formelement[index].checked;
    //               }
    //               obj[columnName] = value;
    //           }
    //       }
    //   }

      obj["RecurrenceRule"] = (obj["Recurrence"]) ? this.recurRule : null;
      console.log($("#recurrence").val());
      
      //var appTypeObj = $("#AppointmentType").data("ejDropDownList");
      //obj["AppointmentType"] = appTypeObj.getSelectedValue();
  // this.scheduleData.find((element) => {if (element.Id == )})


  
  this.bookingService.NewBooking(obj);
  
/*    this.scheduleData.forEach(element => {
        if (element.StartTime == obj.StartTime && element.endTime == obj.EndTime)
        {
            this.scheduleIteratons ++;
            if (this.scheduleIteratons >= 10)
            {
                alert("Reached maximum of 10 appointments during this period. Please select a different time");
                return;
            }
        }
    });

    if (this.scheduleIteratons < 10)
    {
      var schObj = $("#Schedule1").data("ejSchedule");
      schObj.saveAppointment(obj);
      
      this.scheduleData.push(obj);
      this.clearFields();
      
    }
    */
  //  $("#customWindow").ejDialog("close");
  }

  // This function executes when the cancel button in the custom appointment window is pressed.
  cancel(): void {
      this.clearFields();
      
      $("#customWindow").ejDialog("close");

  }

  // Clears all the field values of the custom window after saving appointments
  clearFields(): void {
      //$("#bookingSlotId").val("");
      var recObj = $("#recurrenceEditor").ejRecurrenceEditor('instance');
      recObj.clearRecurrenceFields();
      $("#name").val("");
      $("#emailId").val("");
      $("#phoneNo").val("");
      $("#AppointmentType").val("");
      $("#recsummary").html("");
      $("#summarytr").css("display", "none");
      $("#recurrence").ejCheckBox({ checked: false });
      $("#edittr").css("display", "none");
      $("#StartTime,#EndTime").ejDateTimePicker({ enabled: true });
  }

  // This function executes when the recurrence checkbox is checked in the custom appointment window
  recurCheck(args: any): void {
      if (args.isInteraction) {
          if (args.isChecked) {
              $("#recWindow").css("display", "");
              $("#appWindow").css("display", "none");
              $("#edittr").css("display", "");
          } else {
              $("#recWindow").css("display", "none");
              $("#edittr").css("display", "none");
              $("#recsummary").html("");
              $("#summarytr").css("display", "none");
          }
      }
  }


  // This function executes when the submit/cancel button in the recurrence editor window is pressed.
  onRecurrenceClick(args: any): void {
      
      if ($(args.e.currentTarget).attr("id") === "recsubmit") {
          var recObj = $("#recurrenceEditor").ejRecurrenceEditor('instance');
          recObj.closeRecurPublic();
          this.recurRule = recObj._recRule;
          $("#recsummary").html(this.recurRule);
      } else {
          if (($(args.e.currentTarget).attr("id") === "reccancel")) {
              if ($("#recsummary").html() === "") {
                  $("#edittr").css("display", "none");
                  $("#recurrence").ejCheckBox({ checked: false });
              } else {
                  $("#recurrence").ejCheckBox({ checked: true });
              }
          }
      }
      $("#recWindow").css("display", "none");
      $("#appWindow").css("display", "");
      if ($("#recsummary").html() !== "") {
          $("#summarytr").css("display", "");
      }
  }

  // This function executes when the Edit anchor tag in the edit appointment window is clicked.
  Recurrencerule(): void {
      $("#recWindow").css("display", "");
      $("#appWindow").css("display", "none");
  }
  
 onBeforeAppointmentChange(args) { 
    if (new Date(args.appointment.StartTime).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) 
        args.cancel = true 
  }  

//   onBeforeAppointmentCreate(args) { 
//     if (ej.isNullOrUndefined(args.appointment[0])) 
//         app = args.appointment; 
//     else 
//         app = args.appointment[0]; 
//     if (new Date(app.StartTime).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) 
//         args.cancel = true 
// } 

}
