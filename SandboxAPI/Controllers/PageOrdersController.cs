using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sandbox.Models;

namespace SandboxAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageOrdersController : ControllerBase
    {
        private readonly DynamicAppContext _context;

        public PageOrdersController(DynamicAppContext context)
        {
            _context = context;
        }

        // GET: api/PageOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PageOrder>>> GetPageOrder()
        {
            List<PageOrder> pageOrders = new List<PageOrder>();
            pageOrders =  _context.PageOrder.OrderBy(x => x.PageOrderId).ToList();

            return pageOrders;
        }

        // GET: api/PageOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PageOrder>> GetPageOrder(int id)
        {
            var pageOrder = await _context.PageOrder.FindAsync(id);

            if (pageOrder == null)
            {
                return NotFound();
            }

            return pageOrder;
        }

        // PUT: api/PageOrders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPageOrder(int id, PageOrder pageOrder)
        {
            if (id != pageOrder.PageOrderId)
            {
                return BadRequest();
            }

            _context.Entry(pageOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PageOrderExists(id))
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

        // POST: api/PageOrders
        [HttpPost]
        public async Task<ActionResult<PageOrder>> PostPageOrder(PageOrder pageOrder)
        {
            _context.PageOrder.Add(pageOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPageOrder", new { id = pageOrder.PageOrderId }, pageOrder);
        }

        // DELETE: api/PageOrders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PageOrder>> DeletePageOrder(int id)
        {
            var pageOrder = await _context.PageOrder.FindAsync(id);
            if (pageOrder == null)
            {
                return NotFound();
            }

            _context.PageOrder.Remove(pageOrder);
            await _context.SaveChangesAsync();

            return pageOrder;
        }

        private bool PageOrderExists(int id)
        {
            return _context.PageOrder.Any(e => e.PageOrderId == id);
        }
    }
}
