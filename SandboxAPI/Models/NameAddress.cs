using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class NameAddress
    {
        public int NameAddressId { get; set; }
        public int? NameId { get; set; }
        public int? AddressId { get; set; }

        public virtual Address Address { get; set; }
        public virtual Name Name { get; set; }
    }
}
