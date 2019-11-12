using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class RefPageGroup
    {
        public RefPageGroup()
        {
            QuestionMapping = new HashSet<QuestionMapping>();
        }

        public int PageGroupId { get; set; }
        public string PageGroup { get; set; }

        public virtual ICollection<QuestionMapping> QuestionMapping { get; set; }
    }
}
