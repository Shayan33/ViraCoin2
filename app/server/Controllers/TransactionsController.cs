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
    public class TransactionsController : ControllerBase
    {
        private readonly DBContext _context;

        public TransactionsController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Transactions
        [HttpGet]
        public IEnumerable<Transaction> GetTransactions()
        {
            return _context.Transactions;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByPubKey(string id)
        {
            var TXs = await _context.Transactions
                .Where(x => x.SenderPubKey == id || x.RecipientPubKey == id)
                .ToListAsync();
            if (TXs is null) return NotFound();
            return Ok(TXs);
        }

        [HttpGet("CoinBases")]
        public async Task<IActionResult> GetByPubKey()
        {
            var TXs = await _context.Transactions
                .Where(x => x.Type == TransactionType.CoinBase)
                .ToListAsync();
            if (TXs is null) return NotFound();
            return Ok(TXs);
        }

    }
}