using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class Question
    {
        public Question()
        {
            QuestionMapping = new HashSet<QuestionMapping>();
        }

        public int QuestionId { get; set; }
        public string QuestionText { get; set; }

        public virtual ICollection<QuestionMapping> QuestionMapping { get; set; }
    }
}
