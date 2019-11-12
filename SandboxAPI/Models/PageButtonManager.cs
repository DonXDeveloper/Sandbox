using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sandbox.Models
{
    public partial class PageButtonManager
    {
        public int PageButtonManagerId { get; set; }
        public int? PageGroupId { get; set; }
        public int? PageId { get; set; }
        public bool? Backbutton { get; set; }
        public string BackButtonText { get; set; }
        public int? BackPageId { get; set; }
        public bool? ForwardButton { get; set; }
        public string ForwardButtonText { get; set; }
        public int? ForwardPageId { get; set; }

        public virtual RefPage Page { get; set; }
        public virtual RefPageGroup PageGroup { get; set; }

    }
}
