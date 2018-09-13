using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DBContext context;
        public AccountController(DBContext _context)
        {
            context = _context;
        }

        [HttpGet]
        public IActionResult Get([FromRoute]Guid ID)
        {
            var account = context.Accounts.Find(ID);
            if (account == null) return NotFound();
            return Ok(account);
        }

        [HttpPost]
        public async Task<IActionResult> FillProfile([FromRoute] Guid ID, [FromBody] Account Acc)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var acc = await context.Accounts.FindAsync(ID);
            if (acc == null) return NotFound();
            acc.Name = Acc.Name;
            acc.MiddleName = Acc.MiddleName;
            acc.LastName = Acc.LastName;
            acc.EmailAddress = Acc.EmailAddress;
            acc.PhoneNumber = Acc.PhoneNumber;
            acc.CellNumber = Acc.CellNumber;
            acc.OfficeNumber = Acc.OfficeNumber;
            acc.Address = Acc.Address;
            acc.Fa = Acc.Fa;
            context.Entry(acc).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.Accounts.Add(acc);
            await context.SaveChangesAsync();
            return Ok(acc);
        }
    }
}