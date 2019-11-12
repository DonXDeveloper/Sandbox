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
    public class PersonalsController : ControllerBase
    {
        private readonly DynamicAppContext _context;

        public PersonalsController(DynamicAppContext context)
        {
            _context = context;
        }

        // GET: api/Personals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personal>>> GetPersonal()
        {
            return await _context.Personal.ToListAsync();
        }

        // GET: api/Personals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Personal>> GetPersonal(int id)
        {
            var personal = await _context.Personal.FindAsync(id);

            if (personal == null)
            {
                return NotFound();
            }

            return personal;
        }

        // PUT: api/Personals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonal(int id, Personal personal)
        {
            if (id != personal.PersonalId)
            {
                return BadRequest();
            }

            _context.Entry(personal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonalExists(id))
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

        // POST: api/Personals
        [HttpPost]
        public async Task<ActionResult<Personal>> PostPersonal(IEnumerable<TableData> TableDataList, int nameId)
        {
            Personal personal = new Personal();
            bool hasValues = false;

            personal.NameId = nameId;
            foreach (TableData tableData in TableDataList)
            {
                if (tableData.TableName == nameof(Table.Personal))
                {
                    if (tableData.EnteredValue != "") { hasValues = true; }
                    personal.PersonalId = tableData.TableRecordId;
                    int valueFromString;
                    //personal.DateOfBirth = DateTime.MinValue;
                    switch (tableData.ColumnName)
                    {
                        case nameof(Column.Married):
                            {
                                personal.Married = int.TryParse(tableData.EnteredValue, out valueFromString) ? valueFromString : 0;
                                break;
                            }
                        case nameof(Column.PartnerName): { personal.PartnerName = tableData.EnteredValue; break; }
                        case nameof(Column.Gender):
                            {
                                personal.Gender = int.TryParse(tableData.EnteredValue, out valueFromString) ? valueFromString : 0;
                                //personal.Gender = tableData.EnteredValue;
                                break;
                            }
                        case nameof(Column.DateOfBirth):
                            {
                                DateTime dateOfBirth = DateTime.Parse(tableData.EnteredValue);
                                personal.DateOfBirth = dateOfBirth;
                                break;
                            }
                        case nameof(Column.AtAddress):
                            {
                                personal.AtAddress = int.TryParse(tableData.EnteredValue, out valueFromString) ? valueFromString : 0;
                                //personal.AtAddress = tableData.EnteredValue;
                                break;
                            }
                    }
                }
            }
            // update record
            if (personal.PersonalId > 0)
            {
                await PutPersonal(personal.PersonalId, personal);
            }
            else
            {
                if (hasValues)
                {
                    _context.Personal.Add(personal);
                    await _context.SaveChangesAsync();
                }
            }
            return personal;
        }

        // DELETE: api/Personals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Personal>> DeletePersonal(int id)
        {
            var personal = await _context.Personal.FindAsync(id);
            if (personal == null)
            {
                return NotFound();
            }

            _context.Personal.Remove(personal);
            await _context.SaveChangesAsync();

            return personal;
        }

        private bool PersonalExists(int id)
        {
            return _context.Personal.Any(e => e.PersonalId == id);
        }
    }
}
