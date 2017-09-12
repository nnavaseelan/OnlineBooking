using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineBooking.Domain.Entities;
using OnlineBooking.Domain.Repository;
using OnlineBooking.Domain;

namespace OnlineBooking.Service
{
    public class BookingService : IBookingService
    {
        private readonly Respository<Booking> _respository;

        public BookingService(OnlineBookingContext context)
        {
            _respository = new Respository<Booking>(context);
        }

        public async Task<Booking> GetBookingAsync(Guid bookingId)
        {
            return await _respository.GetAsync(bookingId);
        }

        public async Task<int> GetBookingCountAsync(DateTime startTime, DateTime endTime)
        {
            var result= await _respository.FindAllAsync(q=>q.StartTime>= startTime && q.EndTime<=endTime);
            return result.Count();            
        }

        public async Task<List<Booking>> GetBookings(DateTime startTime, DateTime endTime)
        {
            var result = await _respository.FindAllAsync(q => q.StartTime >= startTime && q.EndTime <= endTime);
            return result.ToList();
        }

        public async Task<bool> InsertBookingAsync(Booking booking)
        {
            return await _respository.AddAsync(booking);            
        }

        public async Task<Booking> UpdateBookingAsync(Booking booking,Guid Id)
        {
            return await _respository.UpdateAsync(booking, Id );
        }

    }
}
