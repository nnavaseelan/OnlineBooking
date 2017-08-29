using Microsoft.AspNet.Identity.EntityFramework;
using OnlineBooking.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineBooking.Domain
{
    public class OnlineBookingContext : IdentityDbContext<User>
    {
        public OnlineBookingContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static OnlineBookingContext Create()
        {
            return new OnlineBookingContext();
        }
    }
}
