using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sandbox.Models
{
    public partial class PageQuestionsMapping
    {
        public int PageGroupId { get; set; }
        public int PageId { get; set; }
        public string QuestionText { get; set; }
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
        public string HelpText { get; set; }
        public string MandatoryText { get; set; }
        public int? FormatTypeId { get; set; }
        public int? DecimalPlaces { get; set; }
        public int? DdlTypeId { get; set; }

    }
}
