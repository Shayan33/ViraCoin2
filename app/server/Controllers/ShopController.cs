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
    public class ShopController : ControllerBase
    {
        private readonly DBContext _context;

        public ShopController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Shop
        [HttpGet]
        public IEnumerable<ShopTokens> GetShopTokens()
        {
            return _context.ShopTokens;
        }

        // GET: api/Shop/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetShopTokens([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shopTokens = await _context.ShopTokens.FindAsync(id);

            if (shopTokens == null)
            {
                return NotFound();
            }

            return Ok(shopTokens);
        }

        // POST: api/Shop
        [HttpPost]
        public async Task<IActionResult> PostShopTokens([FromBody] ShopTokens shopTokens)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            shopTokens.ID = Guid.NewGuid();
            shopTokens.Asset = null;
            var t = new Transaction()
            {
                ID = Guid.NewGuid(),
                SenderID = shopTokens.Account,
                TxHash = shopTokens.Tx,
                Confirmed = false,
                Type = TransactionType.PutInShop,
                Function = "SetAttorny"
            };
            _context.Transactions.Add(t);
            _context.ShopTokens.Add(shopTokens);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShopTokens", new { id = shopTokens.ID }, shopTokens);
        }

        // DELETE: api/Shop/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShopTokens([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shopTokens = await _context.ShopTokens.FindAsync(id);
            if (shopTokens == null)
            {
                return NotFound();
            }

            _context.ShopTokens.Remove(shopTokens);
            await _context.SaveChangesAsync();

            return Ok(shopTokens);
        }

        private bool ShopTokensExists(Guid id)
        {
            return _context.ShopTokens.Any(e => e.ID == id);
        }
    }
}