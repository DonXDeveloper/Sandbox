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
    public class ContactDetailsController : ControllerBase
    {
        private readonly DynamicAppContext _context;

        public ContactDetailsController(DynamicAppContext context)
        {
            _context = context;
        }

        // GET: api/ContactDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactDetails>>> GetContactDetails()
        {
            return await _context.ContactDetails.ToListAsync();
        }

        // GET: api/ContactDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDetails>> GetContactDetails(int id)
        {
            var contactDetails = await _context.ContactDetails.FindAsync(id);

            if (contactDetails == null)
            {
                return NotFound();
            }

            return contactDetails;
        }

        // PUT: api/ContactDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContactDetails(int id, ContactDetails contactDetails)
        {
            if (id != contactDetails.ContactDetailsId)
            {
                return BadRequest();
            }

            _context.Entry(contactDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactDetailsExists(id))
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

        // POST: api/ContactDetails
        [HttpPost]
        public async Task<ActionResult<ContactDetails>> PostContactDetails(ContactDetails contactDetails)
        {
            _context.ContactDetails.Add(contactDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContactDetails", new { id = contactDetails.ContactDetailsId }, contactDetails);
        }

        // DELETE: api/ContactDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ContactDetails>> DeleteContactDetails(int id)
        {
            var contactDetails = await _context.ContactDetails.FindAsync(id);
            if (contactDetails == null)
            {
                return NotFound();
            }

            _context.ContactDetails.Remove(contactDetails);
            await _context.SaveChangesAsync();

            return contactDetails;
        }

        private bool ContactDetailsExists(int id)
        {
            return _context.ContactDetails.Any(e => e.ContactDetailsId == id);
        }
    }
}
