using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class ContactDetails
    {
        public int ContactDetailsId { get; set; }
        public int NameId { get; set; }
        public int? ContactTypeId { get; set; }
        public string ContactDetail { get; set; }
        public bool MainContact { get; set; }
    }
}
