using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBooking.API.Models
{
    public class BookingModel
    {
        public string name { get; set; }        
        public string email { get; set; }        
        public string phone { get; set; }
        public DateTime date { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
    }
}