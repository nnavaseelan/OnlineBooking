import { Component, OnInit } from '@angular/core';
import { EJComponents } from 'ej-angular2';

@Component({
  selector: 'booking-bookingcalendar',
  templateUrl: './bookingcalendar.component.html',
  styleUrls: ['./bookingcalendar.component.css']
})

export class BookingcalendarComponent implements OnInit {
  scheduleIteratons : number = 0;
  ngOnInit(): void {
    
  }
  
  public scheduleData: any;
  constructor() {

    // this.dataManager = ej.DataManager({
    //     // get the required appointments from service
    //     url: "http://js.syncfusion.com/ejServices/api/Schedule/LoadCurrentData",
    //     // enable cross domain
    //     crossDomain: true
    // });
     
  this.scheduleData = [{
          Id: 100, 
          FullName: "Sea Gold", 
          StartTime: new Date(2017,9,7, 10, 0),
          EndTime: new Date(2017,9,7, 13, 0), 
          Description: "", 
          AllDay: false, 
          Recurrence: false,
          Categorize: "1,3",         
          Email:"navaseelan4u@gmail.com",
          Phone:"0774475196"
         
      },
      {
          Id: 101,
          FullName: "Bering Sea Gold", 
          StartTime: new Date(2017, 9,5, 9, 0),
          EndTime: new Date(2017, 9,5, 12, 30), 
          Description: "",
           AllDay: false, 
           Recurrence: false, 
           Categorize: "2,5",          
           Email:"navaseelan4u@gmail.com",
           Phone:"0774475196"
      },
      {
          Id: 102, 
          FullName: "What Happened Next?", 
          StartTime: new Date(2017, 9, 6,8, 0),
          EndTime: new Date(2017, 9, 6, 14, 30), 
          Description: "", 
          AllDay: false, 
          Recurrence: false, 
          Categorize: "3,6",         
          Email:"navaseelan4u@gmail.com",
          Phone:"0774475196"
      }];

  }

  onCellClick(args) {
    args.cancel = true;  // Prevents inline appointment creation on clicking the cells.
    this.onAppointmentWindowOpen(args);
 }
  

  public recurRule;

  // This function executes before the default appointment window opens
  onAppointmentWindowOpen(args: any): void {
      args.cancel = true; // prevents the display of default appointment window
      // defining recurrence editor control to be used as custom appointment window
      $("#recurrenceEditor").ejRecurrenceEditor({ selectedRecurrenceType: 0, frequencies: ["daily", "weekly", "monthly", "yearly", "everyweekday"] });
     // $("#recurrence").ejCheckBox({ change: this.recurCheck });
      var schObj = $("#Schedule1").data("ejSchedule");
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
          
          $("#customerId").val(args.appointment.Id);
          
          $("#name").val(args.appointment.FullName);
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
       let newId  =  this.scheduleData[this.scheduleData.length-1].Id;
    
      var obj = {Id: newId+1, 
          FullName: name, 
          StartTime: new Date($("#StartTime").val()),
          EndTime: new Date($("#EndTime").val()), 
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
this.scheduleData.forEach(element => {
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
      $("#customWindow").ejDialog("close");
    }
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

  // This function executes when the All-day checkbox is checked in the custom appointment window
  alldayCheck(): void {
      // Disables and sets the specific hours to the StartTime and EndTime fields, when the all-day checkbox is checked
    //   if ($("#allday").prop("checked")) {
    //       $("#StartTime").ejDateTimePicker({
    //           value: new Date(new Date($("#StartTime").data("ejDateTimePicker").model.value).setHours(0, 0, 0)),
    //           enabled: false
    //       });
    //       $("#EndTime").ejDateTimePicker({
    //           value: new Date(new Date($("#EndTime").data("ejDateTimePicker").model.value).setHours(0, 0, 0)),
    //           enabled: false
    //       });
    //   } else {
    //       $("#StartTime").ejDateTimePicker({
    //           enabled: true
    //       });
    //       $("#EndTime").ejDateTimePicker({
    //           enabled: true
    //       });
    //   }
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
 

}
