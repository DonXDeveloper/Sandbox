using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sandbox.Models;
using SandboxAPI.CustomModels;

namespace SandboxAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageButtonManageController : ControllerBase
    {
        private readonly DynamicAppContext _context;

        public PageButtonManageController(DynamicAppContext context)
        {
            _context = context;
        }

        //// GET: api/PageButtonManage
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<PageButtonManager>>> GetPageButtonManager()
        //{
        //    return await _context.PageButtonManager.ToListAsync();
        //}

        // GET: api/PageButtonManage/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PageButtonManager>>> GetPageButtonManager(int id)
        {
            List<PageButtonManager> pageButtonManager = new List<PageButtonManager>();
            pageButtonManager = _context.PageButtonManager.Where(x => x.PageGroupId == id)
                .OrderBy(x=> x.PageId).ToList();
            return pageButtonManager;
        }

        //// PUT: api/PageButtonManage/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutPageButtonManager(int id, PageButtonManager pageButtonManager)
        //{
        //    if (id != pageButtonManager.PageButtonManagerId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(pageButtonManager).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PageButtonManagerExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/PageButtonManage
        [HttpPost]
        public async Task<ActionResult<PageButtonManager>> PostPageButtonManager(QuestionQuery questionQuery)
        {
            PageButtonManager pageButtonManager = new PageButtonManager();
            pageButtonManager = _context.PageButtonManager.Where(x => x.PageGroupId == questionQuery.PageGroupId &&
                                                                          x.PageId == questionQuery.PageId).FirstOrDefault();
            return pageButtonManager;
        }

        //// DELETE: api/PageButtonManage/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<PageButtonManager>> DeletePageButtonManager(int id)
        //{
        //    var pageButtonManager = await _context.PageButtonManager.FindAsync(id);
        //    if (pageButtonManager == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.PageButtonManager.Remove(pageButtonManager);
        //    await _context.SaveChangesAsync();

        //    return pageButtonManager;
        //}

        private bool PageButtonManagerExists(int id)
        {
            return _context.PageButtonManager.Any(e => e.PageButtonManagerId == id);
        }
    }
}
