﻿using System;
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
        [HttpGet("GetAssets/{id}")]
        public async Task<IActionResult> GetAssets([FromRoute] Guid id)
        {
            var Owner = await _context.Accounts
            .Include(x => x.Assets)
            .FirstOrDefaultAsync(x => x.ID == id);
            if (Owner == null)
            {
                return NotFound();
            }
            if ((Owner.Assets == null) || (Owner.Assets.Count <= 1)) return NoContent();
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

            var asset = await _context.Assets.FindAsync(id);

            if (asset == null)
            {
                return NotFound();
            }

            return Ok(asset);
        }

        // PUT: api/Assets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset([FromRoute] Guid id, [FromBody] Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asset.ID)
            {
                return BadRequest();
            }

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

            return NoContent();
        }

        // POST: api/Assets
        [HttpPost]
        public async Task<IActionResult> PostAsset([FromBody] Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();

            return Ok(asset);
        }

        [HttpPost("Upload/{id}"), DisableRequestSizeLimit]
        public ActionResult UploadFile([FromRoute]Guid id)
        {
            try
            {
                StringBuilder sb = new StringBuilder("{");
                short index = 0;
                foreach (var file in Request.Form.Files)
                {
                    string folderName = "Img";
                    string webRootPath = _hostingEnvironment.ContentRootPath;
                    string newPath = Path.Combine(webRootPath, folderName);
                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fileFromat = Path.GetExtension(fileName);
                    string[] formats = new string[] { ".png", ".jpg", ".jpeg" };
                    if (!formats.Contains(fileFromat.ToLower())) continue;
                    if (file.Length > 0 && file.Length < 2e6)
                    {
                        var Name = Guid.NewGuid().ToString();
                        sb.Append($"\"{index}\":\"{Name}\",");
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
                sb.Append("}");
                return Ok(sb.ToString());
            }
            catch (System.Exception ex)
            {
                return BadRequest("Upload Failed: " + ex.Message);
            }
        }

        private bool AssetExists(Guid id)
        {
            return _context.Assets.Any(e => e.ID == id);
        }
    }
}