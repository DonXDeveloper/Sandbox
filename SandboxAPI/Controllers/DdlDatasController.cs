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
    public class DdlDatasController : ControllerBase
    {
        private readonly DynamicAppContext _context;

        public DdlDatasController(DynamicAppContext context)
        {
            _context = context;
        }

        // GET: api/DdlDatas
        [HttpGet]
        public  IEnumerable<DdlData> GetDdlData()
        {
            List<DdlData> ddlDataList = new List<DdlData>();
            ddlDataList = _context.DdlData.OrderBy(x => x.DdlTypeId).ThenBy(y => y.DdlItemKey).ToList();

            return ddlDataList;
        }

        // GET: api/DdlDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DdlData>> GetDdlData(int id)
        {
            var ddlData = await _context.DdlData.FindAsync(id);

            if (ddlData == null)
            {
                return NotFound();
            }

            return ddlData;
        }

        // PUT: api/DdlDatas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDdlData(int id, DdlData ddlData)
        {
            if (id != ddlData.DdlDataId)
            {
                return BadRequest();
            }

            _context.Entry(ddlData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DdlDataExists(id))
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

        // POST: api/DdlDatas
        [HttpPost]
        public async Task<ActionResult<DdlData>> PostDdlData(DdlData ddlData)
        {
            _context.DdlData.Add(ddlData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDdlData", new { id = ddlData.DdlDataId }, ddlData);
        }

        // DELETE: api/DdlDatas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DdlData>> DeleteDdlData(int id)
        {
            var ddlData = await _context.DdlData.FindAsync(id);
            if (ddlData == null)
            {
                return NotFound();
            }

            _context.DdlData.Remove(ddlData);
            await _context.SaveChangesAsync();

            return ddlData;
        }

        private bool DdlDataExists(int id)
        {
            return _context.DdlData.Any(e => e.DdlDataId == id);
        }
    }
}
