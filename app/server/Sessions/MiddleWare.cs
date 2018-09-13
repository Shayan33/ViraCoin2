using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Sessions
{
    public static class MiddleWare
    {
        public static void UseSessions(this IApplicationBuilder app)
        {
            app.Map("/Login", app2 =>
              {
                  app2.Run(async c =>
                  {
                      var sessions = c.RequestServices.GetRequiredService<SessionProvider>();
                      var DB = c.RequestServices.GetRequiredService<DBContext>();
                      var Token = c.Request.Headers["LoginToken"].ToString();
                  });
              });
        }
    }
}
