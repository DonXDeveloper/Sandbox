using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sandbox.Models
{
    public class PageOrder
    {
        public int PageOrderId { get; set; }
        public int PageGroupId { get; set; }
        public int PageId { get; set; }
        public int DisplayOrder { get; set; }
    }
}
