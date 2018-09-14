using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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
        public static void UseMySessions(this IApplicationBuilder app)
        {
            app.Map("/Login", app2 =>
              {
                  app2.Run(async c =>
                  {
                      if (c.Request.Headers.ContainsKey("PubKey") /*&& c.Request.Headers.ContainsKey("Sign")*/)
                      {
                          var sessions = c.RequestServices.GetRequiredService<SessionProvider>();
                          var DB = c.RequestServices.GetRequiredService<DBContext>();
                          var PubKey = c.Request.Headers["PubKey"].ToString();
                          // var Sign = c.Request.Headers["Sign"].ToString();
                          var User = await DB.Accounts.FirstOrDefaultAsync(x => x.PubKey == PubKey);
                          if (User != null)
                          {
                              //   if (User.Signture == Sign)
                              //   {
                              sessions.Add(User.ID, PubKey);
                              c.Response.Headers.Add("Session", User.ID.ToString());
                              c.Response.Headers.Add("Cookie", Guid.NewGuid().ToString());
                              c.Response.StatusCode = 200;
                              await c.Response.WriteAsync(User.ID.ToString());
                              return;
                              //   }
                              //   c.Response.StatusCode = 400;
                              //   return;
                          }
                          User = new Account()
                          {
                              ID = Guid.NewGuid(),
                              //Signture = Sign,
                              PubKey = PubKey
                          };
                          DB.Accounts.Add(User);
                          await DB.SaveChangesAsync();
                          sessions.Add(User.ID, PubKey);
                          c.Response.Headers.Add("Session", User.ID.ToString());
                          c.Response.Headers.Add("Cookie", Guid.NewGuid().ToString());
                          c.Response.StatusCode = 201;
                          await c.Response.WriteAsync(User.ID.ToString());
                      }
                      c.Response.StatusCode = 400;
                  });
              });

            // app.Map("/Register", app2 =>
            //  {
            //      app2.Run(async c =>
            //      {
            //          if (c.Request.Headers.ContainsKey("PubKey") && c.Request.Headers.ContainsKey("Sign"))
            //          {
            //              var sessions = c.RequestServices.GetRequiredService<SessionProvider>();
            //              var DB = c.RequestServices.GetRequiredService<DBContext>();
            //              var PubKey = c.Request.Headers["PubKey"].ToString();
            //              var Sign = c.Request.Headers["Sign"].ToString();
            //              if (await DB.Accounts.AnyAsync(x => x.PubKey == PubKey))
            //              {
            //                  c.Response.StatusCode = 409;
            //                  await c.Response.WriteAsync("Confilict");
            //                  return;
            //              }
            //              var User = new Account()
            //              {
            //                  ID = Guid.NewGuid(),
            //                  Signture = Sign,
            //                  PubKey = PubKey
            //              };
            //              DB.Accounts.Add(User);
            //              await DB.SaveChangesAsync();
            //              sessions.Add(User.ID);
            //              c.Response.Headers.Add(Guid.NewGuid().ToString(), User.ID.ToString());
            //              c.Response.StatusCode = 200;
            //              await c.Response.WriteAsync(User.ID.ToString());
            //          }
            //          c.Response.StatusCode = 400;
            //      });
            //  });

            app.Map("/api", app2 =>
            {
                app2.Use(async (c, n) =>
                {
                    if (c.Request.Headers.ContainsKey("PrivateToken") && c.Request.Headers.ContainsKey("PubKey"))
                    {
                         var PubKey = c.Request.Headers["PubKey"].ToString(); 
                        var Token = c.Request.Headers["PrivateToken"].ToString();
                        if (Guid.TryParse(Token, out var t))
                        {
                            var sessions = c.RequestServices.GetRequiredService<SessionProvider>();
                            if (sessions.Get(t,PubKey))
                            {
                                await n.Invoke();
                            }
                            else
                            {
                                c.Response.StatusCode = 401;
                            }
                        }
                        else
                        {
                            c.Response.StatusCode = 401;
                        }
                    }
                    else
                    {
                        c.Response.StatusCode = 401;
                    }
                });

                app2.UseMvc();
            });
        }
    }
}
