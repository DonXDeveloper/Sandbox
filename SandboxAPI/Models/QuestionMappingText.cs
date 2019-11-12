using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class QuestionMappingText
    {
        public int QuestionMappingTextId { get; set; }
        public int? QuestionMappingId { get; set; }
        public string HelpText { get; set; }
        public string MandatoryText { get; set; }
        public int? FormatTypeId { get; set; }
        public int? DecimalPlaces { get; set; }
        public int? DdlTypeId { get; set; }

        public virtual QuestionMapping QuestionMapping { get; set; }
    }
}
