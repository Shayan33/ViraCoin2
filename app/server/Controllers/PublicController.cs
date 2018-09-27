using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("papi/[controller]")]
    [ApiController]
    public class PublicController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public PublicController(DBContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.ShopTokens
                .Include(x => x.Asset)
                .Select(x => new { x.Asset.ImgPath, x.Asset.Token, x.Asset.Production, x.Price, x.ID }));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetToken([FromRoute]Guid id)
        {
            var sh = await _context.ShopTokens
                .Include(x => x.Asset)
                .Select(x => new { x.Asset.ImgPath, x.Asset.Token, x.Asset.Production, x.Price, x.ID })
                .FirstOrDefaultAsync(x => x.ID == id);
            if (sh is null) return NoContent();
            return Ok(sh);
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
    }
}