using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public AssetsController(DBContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet("ISOK/{id}")]
        public async Task<IActionResult> IsOk(string id)
        {
            var a = new Asset()
            {
                Token = id
            };
            try
            {
                a.ChunkData();
            }
            catch
            {
                return BadRequest();
            }
            if (await _context.Assets.AnyAsync(x => x.I1 == a.I1 && x.I2 == a.I2 && x.I3 == a.I3 && x.I4 == a.I4))
                return Ok();
            return NotFound();
        }

        [HttpGet("GetAssets/{id}")]
        public async Task<IActionResult> GetAssets([FromRoute] Guid id)
        {
            var Owner = await _context.Accounts
            .Include(x => x.Assets)
            .FirstOrDefaultAsync(x => x.ID == id);
            if (Owner is null)
            {
                return NotFound();
            }
            if ((Owner.Assets is null) || (Owner.Assets.Count < 1)) return NoContent();
            return Ok(Owner.Assets);
        }
        // GET: api/Assets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsset([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var asset = await _context
                            .Assets
                            .Include(x => x.InShop)
                            .Include(x => x.Owner)
                            .FirstOrDefaultAsync(x => x.ID == id);
            if (asset is null)
            {
                return NotFound();
            }
            if (!asset.Owner.PubKey.Equals(HttpContext.Request.Headers["PubKey"].ToString()))
                return BadRequest();
            return Ok(asset);
        }

        // PUT: api/Assets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset([FromRoute] Guid id, [FromBody] Asset ass)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var asset = await _context.Assets.FindAsync(id);
            var nextOwner = _context.Accounts.FirstOrDefault(x => x.PubKey.Equals(ass.CurrentOwner, StringComparison.OrdinalIgnoreCase));
            if (asset.CurrentOwner != ass.PrevOwner) return BadRequest();
            var t = new Transaction()
            {
                ID = Guid.NewGuid(),
                SenderID = asset.OWnerID,
                Recipient = ass.CurrentOwner,
                TxHash = ass.Tx,
                Confirmed = false,
                Type = TransactionType.Transfer,
                Function = "Transfer"
            };
            if (!(nextOwner is null)) asset.Owner = nextOwner;
            asset.CurrentOwner = ass.CurrentOwner;
            asset.PrevOwner = ass.PrevOwner;
            _context.Entry(asset).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Assets
        [HttpPost]
        public async Task<IActionResult> PostAsset([FromBody] Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            asset.ID = Guid.NewGuid();
            //asset.ChunkData();
            asset.CurrentOwner = HttpContext.Request.Headers["PubKey"].ToString();
            asset.PrevOwner = string.Empty;
            asset.FirstOwner = HttpContext.Request.Headers["PubKey"].ToString();
            asset.Issuer = HttpContext.Request.Headers["PubKey"].ToString();
            asset.AttorneyOwner = string.Empty;
            asset.ForSale = false;
            asset.Available = false;
            asset.Owner = null;
            asset.OWnerID = Guid.Parse(HttpContext.Request.Headers["PrivateToken"].ToString());
            var t = new Transaction()
            {
                ID = Guid.NewGuid(),
                SenderID = asset.OWnerID,
                CoinBaseRelatedCoinID = asset.ID,
                TxHash = asset.Tx,
                Confirmed = false,
                Type = TransactionType.CoinBase,
                Function = "Isuue"
            };
            _context.Transactions.Add(t);
            _context.Assets.Add(asset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsset", new { id = asset.ID }, asset);
        }

        // DELETE: api/Assets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }
            var tx = HttpContext.Request.Headers["tx"].ToString();
            var t = new Transaction()
            {
                ID = Guid.NewGuid(),
                SenderID = asset.OWnerID,
                TxHash = tx,
                Confirmed = false,
                Type = TransactionType.Burn,
                Function = "Burn"
            };
            _context.Transactions.Add(t);
            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();

            return Ok(asset);
        }

        [HttpPost("Up"), DisableRequestSizeLimit]
        public IActionResult UploadFile()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                short index = 0;
                foreach (var file in Request.Form.Files)
                {
                    string folderName = "Files";
                    string webRootPath = _hostingEnvironment.ContentRootPath;
                    string newPath = Path.Combine(webRootPath, folderName);
                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fileFromat = Path.GetExtension(fileName);
                    string[] formats = new string[] { ".png", ".jpg", ".jpeg", ".txt", ".pdf" };
                    if (!formats.Contains(fileFromat.ToLower())) continue;
                    if (file.Length > 0 && file.Length < 2e6)
                    {
                        var Name = Guid.NewGuid().ToString();
                        sb.Append($"{Name}{fileFromat},");
                        string fullPath = Path.Combine(newPath, $"{Name}{fileFromat}");
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                    index++;
                    if (index == 8) break;
                }
                sb.Remove(sb.Length - 1, 1);
                return Ok(new
                {
                    Data = sb.ToString()
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest("Upload Failed: " + ex.Message);
            }
        }
        [HttpGet("Down/{id}")]
        public async Task<IActionResult> File(string id)
        {
            if (id == null)
                return NotFound("filename not present");

            var path = Path.Combine(
                           _hostingEnvironment.ContentRootPath,
                           "Files", id);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }
        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }
        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                 {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"}
            };
        }

        private bool AssetExists(Guid id)
        {
            return _context.Assets.Any(e => e.ID == id);
        }
    }
}