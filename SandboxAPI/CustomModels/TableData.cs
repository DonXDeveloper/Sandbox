using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SandboxAPI.CustomModels
{
    public class TableData
    {
        public string TableName { get; set; }
        public string ColumnName { get; set; }
        public string ReferenceTable { get; set; }
        public int ReferenceId { get; set; }
        public string EnteredValue { get; set; }
        public int TableRecordId { get; set; }
    }
}
