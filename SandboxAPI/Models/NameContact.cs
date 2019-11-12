using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class NameContact
    {
        public int NameContactId { get; set; }
        public int? NameId { get; set; }
        public int? ContactDetailsId { get; set; }
        public bool? MainContact { get; set; }

        public virtual ContactDetails ContactDetails { get; set; }
        public virtual Name Name { get; set; }
    }
}
