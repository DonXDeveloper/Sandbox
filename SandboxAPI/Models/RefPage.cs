using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class RefPage
    {
        public RefPage()
        {
            QuestionMapping = new HashSet<QuestionMapping>();
        }

        public int PageId { get; set; }
        public string PageName { get; set; }

        public virtual ICollection<QuestionMapping> QuestionMapping { get; set; }
    }
}
