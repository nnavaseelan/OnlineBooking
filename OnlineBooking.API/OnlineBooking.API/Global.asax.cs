using AutoMapper;
using OnlineBooking.API.Models;
using OnlineBooking.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace OnlineBooking.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected  IMapper _mapper;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            Map();


        }

        private void Map()
        {
            //Mapper.Initialize(cfg => {
            //    cfg.CreateMap<Booking, BookingModel>();
            //});

            Mapper.Initialize(cfg => {
                cfg.SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
                cfg.DestinationMemberNamingConvention = new PascalCaseNamingConvention();
                cfg.CreateMap<Booking, BookingModel>();
            });

            //var config = new MapperConfiguration(x =>
            //{
            //    x.CreateMap<Booking, BookingModel>();
            //   // x.CreateMap<User, UserDto>();
            //});

            //_mapper = config.CreateMapper();

        }
    }
}
