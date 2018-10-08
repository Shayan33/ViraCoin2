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
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(context.Accounts);
        }

        [HttpGet("ICORnd/{id}")]
        public async Task<IActionResult> GetforIco([FromRoute]int id)
        {
            var p = await context.Accounts
                         .Where(x => !x.GotICOCoin)
                         .ToArrayAsync();
            var l = p.Length;
            var rnd = new Random();
            for (int i = 0; i < l; i++)
            {
                var o = rnd.Next(l);
                (p[i], p[o]) = (p[o], p[i]);
            }
            return Ok(p.Take((l * id) / 100));
        }

        [HttpGet("AddICORnd/{id}")]
        public async Task<IActionResult> GetforAddIco([FromRoute]int id)
        {
            var p = await context.Accounts
                         .Where(x => x.GotICOCoin)
                         .ToArrayAsync();
            var l = p.Length;
            var rnd = new Random();
            for (int i = 0; i < l; i++)
            {
                var o = rnd.Next(l);
                (p[i], p[o]) = (p[o], p[i]);
            }
            return Ok(p.Take((l * id) / 100));
        }
        [HttpGet("GetForConfirm/{id}")]
        public async Task<IActionResult> GetForConfirm([FromRoute]string id)
        {
            if (id == "NaN")
            {
                var p = await context.Accounts
                            .Where(x => x.PersonalID.Contains(id) || x.PubKey.Contains(id))
                            .ToListAsync();
                if (p is null) return NotFound();
                return Ok(p);
            }
            return Ok(await context.Accounts.ToListAsync());
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
            acc.IDPic = string.Empty;
            acc.GotICOCoin = false;
            acc.Registered = false;
            context.Entry(acc).State = Microsoft.EntityFrameworkCore.EntityState.Added;
            context.Accounts.Add(acc);
            await context.SaveChangesAsync();
            return Ok(acc);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> ICO([FromRoute]Guid id)
        {
            var p = await context.Accounts.FindAsync(id);
            if (p is null) return NotFound();
            p.GotICOCoin = true;
            context.Entry(p).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok();
        }


        [HttpPatch("Confirm/{id}")]
        public async Task<IActionResult> Confirm([FromRoute]Guid id)
        {
            var p = await context.Accounts.FindAsync(id);
            if (p is null) return NotFound();
            p.Registered = true;
            context.Entry(p).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}