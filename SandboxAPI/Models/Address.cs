using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class Address
    {
        public int AddressId { get; set; }
        public int NameId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string Postcode { get; set; }
    }
}
