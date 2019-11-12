using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class RefObjectType
    {
        public RefObjectType()
        {
            QuestionMapping = new HashSet<QuestionMapping>();
        }

        public int ObjectTypeId { get; set; }
        public string ObjectType { get; set; }

        public virtual ICollection<QuestionMapping> QuestionMapping { get; set; }
    }
}
