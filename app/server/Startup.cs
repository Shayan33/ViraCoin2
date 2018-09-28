using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http;
using server.Models;
using server.Sessions;

namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DBContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddSingleton<SessionProvider>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.Map("/Guid", app2 =>
            {
                app2.Run(async c =>
                {
                    c.Response.ContentType = "application/json";
                    var g = System.Guid.NewGuid();
                    await c.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(new
                    {
                        Guid = g,
                        HexString = ToHexString(g.ToByteArray())
                    }));
                });
            });
            app.Map("/CheckGuid", app2 =>
            {
                app2.Run(async c =>
                {
                    if (c.Request.Headers.ContainsKey("data"))
                    {
                        var data = c.Request.Headers["data"].ToString();
                        if (System.Guid.TryParse(data, out var g))
                        {
                            var db = c.RequestServices.GetRequiredService<DBContext>();
                            var p = await db.Assets.FindAsync(g);
                            if (p is null)
                            {
                                c.Response.StatusCode = 200;
                                await c.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(new
                                {
                                    status = "Ok",
                                    HexString = ToHexString(g.ToByteArray())
                                }));
                            }
                            else
                            {
                                c.Response.StatusCode = 400;
                                await c.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(new
                                {
                                    status = "Bad",
                                    HexString = ToHexString(g.ToByteArray())
                                }));
                            }
                        }
                        else
                        {
                            c.Response.StatusCode = 400;
                            await c.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(new
                            {
                                status = "Bad",
                                HexString = ToHexString(g.ToByteArray())
                            }));
                        }
                    }
                    else
                    {
                        c.Response.StatusCode = 400;
                        await c.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(new
                        {
                            status = "Bad"
                        }));
                    }
                });
            });
            app.Map("/papi", app2 => app2.UseMvc());
            app.UseMySessions();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
        private string ToHexString(byte[] bytes)
        {
            var hex = new System.Text.StringBuilder(bytes.Length * 2);
            foreach (var b in bytes)
            {
                hex.AppendFormat("{0:x2}", b);
            }
            return hex.ToString();
        }
    }
}
