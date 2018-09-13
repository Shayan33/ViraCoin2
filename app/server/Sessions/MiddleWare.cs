using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
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
                      var PubKey = c.Request.Headers["PubKey"].ToString();
                      var Sign = c.Request.Headers["Sign"].ToString();
                      var User = await DB.Accounts.FindAsync(PubKey);
                      if(User!=null &&User.Signture==Sign)
                      {
                          sessions.Add(User.ID);
                          c.Response.Headers.Add(Guid.NewGuid().ToString(), User.ID.ToString());
                          c.Response.StatusCode = 200;
                          await c.Response.WriteAsync(User.ID.ToString());
                          return;
                      }
                      c.Response.StatusCode = 400;
                  });
              });
        }
    }
}
