using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("{ID}")]
        public IActionResult Get([FromRoute]Guid ID)
        {
            var account = context.Accounts.Find(ID);
            if (account == null) return NotFound();
            return Ok(account);
        }

        [HttpGet("pkg/{ID}")]
        public IActionResult GetByPubKey([FromRoute] string ID)
        {
            var account = context.Accounts.FirstOrDefault(x => x.PubKey.Equals(ID, StringComparison.OrdinalIgnoreCase));
            if (account == null) return NotFound();
            return Ok(account);
        }

        [HttpPost]
        public async Task<IActionResult> FillProfile([FromBody] Account acc)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!((await context.Accounts.FirstOrDefaultAsync(x => x.PubKey == acc.PubKey)) is null))
                return NotFound();
            if (!((await context.Accounts.FirstOrDefaultAsync(x => x.PersonalID == acc.PersonalID)) is null))
                return NotFound();
            acc.ID = Guid.NewGuid();
            acc.MiddleName = string.Empty;
            acc.IDPic = string.Empty;
            context.Entry(acc).State = Microsoft.EntityFrameworkCore.EntityState.Added;
            context.Accounts.Add(acc);
            await context.SaveChangesAsync();
            return Ok(acc);
        }
    }
}