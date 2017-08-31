using OnlineBooking.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineBooking.Service
{
    public interface IBookingService
    {
        Task<bool> InsertBookingAsync(Booking booking);
        Task<Booking> GetBookingAsync(Guid bookingId);
        Task<int> GetBookingCountAsync(DateTime date, DateTime startTime,DateTime endTime);
        Task<List<Booking>> GetBookings(DateTime date, DateTime startTime, DateTime endTime);
    }
}
