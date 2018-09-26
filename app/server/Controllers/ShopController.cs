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
            var ass = await _context.Assets.FindAsync(shopTokens.AssetID);
            ass.ForSale = true;
            shopTokens.Account = ass.OWnerID;
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
            _context.Entry(ass).State = EntityState.Modified;
            _context.Transactions.Add(t);
            _context.ShopTokens.Add(shopTokens);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Shop/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShopTokens([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var asss = await _context.Assets
                .Include(x => x.InShop)
                .FirstOrDefaultAsync(x => x.ID == id);
            var shopTokens = asss.InShop;
            if (shopTokens == null)
            {
                return NotFound();
            }
            var ass = await _context.ShopTokens
                .Include(x => x.Asset)
                .FirstOrDefaultAsync(x => x.AssetID == id);

            ass.Asset.ForSale = false;

            _context.Entry(ass.Asset).State = EntityState.Modified;
            _context.Assets.Update(ass.Asset);
            _context.ShopTokens.Remove(shopTokens);
            await _context.SaveChangesAsync();

            return Ok(shopTokens);
        }
        [HttpPatch]
        public async Task<IActionResult> UpdateFee([FromBody] ShopTokens shopTokens)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var sh = await _context.ShopTokens
                .FirstOrDefaultAsync(x => x.AssetID == shopTokens.ID);
            var t = new Transaction()
            {
                ID = Guid.NewGuid(),
                SenderID = sh.Account,
                TxHash = shopTokens.Tx,
                Confirmed = false,
                Type = TransactionType.PutInShop,
                Function = "UpdatePrice"
            };
            sh.Price = shopTokens.Price;
            _context.Entry(sh).State = EntityState.Modified;
            //_context.Transactions.Add(t);
            _context.ShopTokens.Update(sh);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ShopTokensExists(Guid id)
        {
            return _context.ShopTokens.Any(e => e.ID == id);
        }
    }
}