import { Component, OnInit } from '@angular/core';
import { EJComponents } from 'ej-angular2';

@Component({
  selector: 'booking-bookingcalendar',
  templateUrl: './bookingcalendar.component.html',
  styleUrls: ['./bookingcalendar.component.css']
})

export class BookingcalendarComponent implements OnInit {
  
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
          Id: 100, Subject: "Sea Gold", StartTime: new Date(2014, 4, 5, 10, 0),
          EndTime: new Date(2014, 4, 5, 11, 0), Description: "", 
          AllDay: false, 
          Recurrence: false,
          Categorize: "1,3",
          Location: "CHINA"
         
      },
      {
          Id: 101, Subject: "Bering Sea Gold", StartTime: new Date(2014, 4, 2, 16, 0),
          EndTime: new Date(2014, 4, 2, 17, 30), Description: "",
           AllDay: false, Recurrence: false, Categorize: "2,5",Location: "Srilanka"
      },
      {
          Id: 102, Subject: "What Happened Next?", StartTime: new Date(2014, 4, 4, 1, 0),
          EndTime: new Date(2014, 4, 4, 1, 30), Description: "", AllDay: false, 
          Recurrence: false, Categorize: "3,6",Location: "India"
      }];

  }
  

  public recurRule;
  // This function executes before the default appointment window opens
  onAppointmentWindowOpen(args: any): void {
      args.cancel = true; // prevents the display of default appointment window
      // defining recurrence editor control to be used as custom appointment window
      $("#recurrenceEditor").ejRecurrenceEditor({ selectedRecurrenceType: 0, frequencies: ["daily", "weekly", "monthly", "yearly", "everyweekday"] });
      $("#recurrence").ejCheckBox({ change: this.recurCheck });
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
          $("#customId").val(args.appointment.Id);
          $("#subject").val(args.appointment.Subject);
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
      // checks if the subject value is not left blank before saving it.
      if ($.trim($("#subject").val()) == "") {
          $("#subject").addClass("error");
          return false;
      }
      var obj = {};
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
      var appTypeObj = $("#AppointmentType").data("ejDropDownList");
      obj["AppointmentType"] = appTypeObj.getSelectedValue();
      $("#customWindow").ejDialog("close");
      var schObj = $("#Schedule1").data("ejSchedule");
      schObj.saveAppointment(obj);
      this.clearFields();
  }

  // This function executes when the cancel button in the custom appointment window is pressed.
  cancel(): void {
      this.clearFields();
      $("#customWindow").ejDialog("close");
  }

  // Clears all the field values of the custom window after saving appointments
  clearFields(): void {
      $("#customId").val("");
      var recObj = $("#recurrenceEditor").ejRecurrenceEditor('instance');
      recObj.clearRecurrenceFields();
      $("#subject").val("");
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
