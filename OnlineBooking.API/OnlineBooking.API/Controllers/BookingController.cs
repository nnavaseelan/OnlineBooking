using AutoMapper;
using OnlineBooking.API.Models;
using OnlineBooking.Domain;
using OnlineBooking.Domain.Entities;
using OnlineBooking.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using static OnlineBooking.Domain.Common;

namespace OnlineBooking.API.Controllers
{
    [RoutePrefix("api/booking")]
    public class BookingController : ApiController
    {
        private readonly IBookingService _bookingService;
        public BookingController()
        {
            _bookingService = new BookingService(new OnlineBookingContext());
        }

        [Route("appointment")]
        [HttpPost]
        public async Task<IHttpActionResult> BookAppointment(BookingModel model)
        {
            //var booking =Mapper.Map<BookingModel,Booking>(model);
            var booking = new Booking
            {
                Name=model.name,
                Email=model.email,
                Phone=model.phone,
                Date=model.date,
                StartTime=model.startTime,
                EndTime=model.endTime,
                Status= (int)BookingStatus.Pending
            };

            var result = await _bookingService.InsertBookingAsync(booking);
            if(result)
                return Ok("Success");
            else
                return BadRequest("Saved failed !");

        }
        
        [Route("allowcount")]
        [HttpGet]
        public async Task<IHttpActionResult> BookingCount(DateTime startTime, DateTime endTime)
        {
            var result = await _bookingService.GetBookingCountAsync(startTime,endTime);
            return Json(result);
        }

        [Route("checkslots")]
        [HttpGet]
        public async Task<IHttpActionResult> CheckBookedSlots(DateTime startTime, DateTime endTime)
        {
            var result = await _bookingService.CheckBookedSlotAsync(startTime, endTime);
            return Json(result);
        }

        [Route("bookinglist")]
        [HttpGet]
        public async Task<IHttpActionResult> Bookings(DateTime startTime, DateTime endTime)
        {
            var result = await _bookingService.GetBookings(startTime, endTime);
            return Json(result);
        }

        [Route("updateappointment")]
        [HttpPost]
        public async Task<IHttpActionResult> UpdateAppointment(BookingModel model, Guid id)
        {
            //var booking =Mapper.Map<BookingModel,Booking>(model);
            var booking = new Booking
            {
                
                Name = model.name,
                Email = model.email,
                Phone = model.phone,
                Date = model.date,
                StartTime = model.startTime,
                EndTime = model.endTime,
                Status = (int)BookingStatus.Pending
            };

            var result = await _bookingService.UpdateBookingAsync(booking, id);
            if (result.Id == booking.Id)
                return Ok("Success");
            else
                return BadRequest("Saved failed !");

        }
    }
}
