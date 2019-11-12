using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sandbox.Models
{
    public class Personal
    {
        public int PersonalId { get; set; }
        public int NameId { get; set; }
        public int? Married { get; set; }
        public string PartnerName { get; set; }
        public int? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? AtAddress { get; set; }
    }
}
