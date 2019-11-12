using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class QuestionMapping
    {
        public QuestionMapping()
        {
            QuestionMappingText = new HashSet<QuestionMappingText>();
        }

        public int QuestionMappingId { get; set; }
        public int? PageGroupId { get; set; }
        public int? PageId { get; set; }
        public int? QuestionId { get; set; }
        public int? DisplayOrder { get; set; }
        public string OptionNextList { get; set; }
        public string OptionTextList { get; set; }
        public int? NextQuestion { get; set; }
        public int? RepeatNext { get; set; }
        public int? ObjectTypeId { get; set; }
        public int? Columns { get; set; }
        public int? ScreenColumns { get; set; }
        public string FieldName { get; set; }
        public string TableName { get; set; }
        public string ColumnName { get; set; }
        public string ReferenceTable { get; set; }
        public int? ReferenceId { get; set; }
        public int? MaxSize { get; set; }
        public bool? Mandatory { get; set; }
        public bool? InUse { get; set; }

        public virtual RefObjectType ObjectType { get; set; }
        public virtual RefPage Page { get; set; }
        public virtual RefPageGroup PageGroup { get; set; }
        public virtual Question Question { get; set; }
        public virtual ICollection<QuestionMappingText> QuestionMappingText { get; set; }
    }
}
