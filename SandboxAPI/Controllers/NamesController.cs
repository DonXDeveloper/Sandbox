using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sandbox.Models;
using SandboxAPI.CustomModels;
using SandboxAPI.Enum;

namespace SandboxAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NamesController : ControllerBase
    {
        private readonly DynamicAppContext _context;

        public NamesController(DynamicAppContext context)
        {
            _context = context;
        }

        // GET: api/Names
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<Name>>> GetName()
        //{
        //    return await _context.Name.ToListAsync();
        //}
        public async Task<ActionResult<IEnumerable<Name>>> GetName()
        {
            List<Name> nameList = new List<Name>();

            nameList = await _context.Name.ToListAsync();
            return nameList;
        }

        // GET: api/Names/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Name>>> GetName(int id)
        {
            List<Name> names = new List<Name>();
            Name name = await _context.Name.FindAsync(id);
            if (name == null)
            {
                return NotFound();
            }
            names.Add(name);
            return names;
        }

        // PUT: api/Names/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutName(int id, Name name)
        {
            if (id != name.NameId)
            {
                return BadRequest();
            }

            _context.Entry(name).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NameExists(id))
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

        // POST: api/Names
        [HttpPost]
        public async Task<ActionResult<Name>> PostName(IEnumerable<TableData> TableDataList)
        {
            Name name = new Name();
            bool hasValues = false;
            foreach (TableData tableData in TableDataList)
            {
                if (tableData.TableName == nameof(Table.Name))
                {
                    if (tableData.EnteredValue != "") { hasValues = true; }
                    name.NameId = tableData.TableRecordId;
                    switch (tableData.ColumnName)
                    {
                        case nameof(Column.FirstName): { name.FirstName = tableData.EnteredValue; break; }
                        case nameof(Column.LastName): { name.LastName = tableData.EnteredValue; break; }
                    }
                }
            }
            // update record
            if (name.NameId > 0)
            {
                await PutName(name.NameId, name);
            }
            else
            {
                if (hasValues)
                {
                    _context.Name.Add(name);
                    await _context.SaveChangesAsync();
                }
            }
            return name;
        }

        // DELETE: api/Names/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Name>> DeleteName(int id)
        {
            var name = await _context.Name.FindAsync(id);
            if (name == null)
            {
                return NotFound();
            }

            _context.Name.Remove(name);
            await _context.SaveChangesAsync();

            return name;
        }

        private bool NameExists(int id)
        {
            return _context.Name.Any(e => e.NameId == id);
        }
    }
}
