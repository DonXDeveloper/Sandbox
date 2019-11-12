using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sandbox.Models;
using SandboxAPI.CustomModels;
using SandboxAPI.Enum;

namespace SandboxAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicNameAddressController : ControllerBase
    {
        private readonly DynamicAppContext _context;

        public DynamicNameAddressController(DynamicAppContext context)
        {
            _context = context;
        }

        // POST: api/DynamicNameAddress
        [HttpPost]
        public async Task<ActionResult<IEnumerable<TableId>>> PostDynamicNameAddress(IEnumerable<TableData> tableDataList)
        {
            List<TableId> tableIdList = GetTableList(tableDataList);

            NamesController namesController = new NamesController(_context);
            ActionResult<Name> actionResultName = await namesController.PostName(tableDataList);
            Name name = actionResultName.Value;

            PersonalsController personalsController = new PersonalsController(_context);
            ActionResult<Personal> actionResultPersonal = await personalsController.PostPersonal(tableDataList, name.NameId);
            Personal personal = actionResultPersonal.Value;

            AddressesController addressesController = new AddressesController(_context);
            ActionResult<Address> actionResultAddress = await addressesController.PostAddress(tableDataList);
            Address address = actionResultAddress.Value;

            foreach(TableId tableId in tableIdList)
            {
                switch (tableId.TableName)
                {
                    case nameof(Table.Name):
                        {
                            tableId.Id = name.NameId;
                            break;
                        }
                    case nameof(Table.Address):
                        {
                            tableId.Id = address.AddressId;
                            break;
                        }
                    case nameof(Table.Personal):
                        {
                            tableId.Id = personal.PersonalId;
                            break;
                        }
                }
            }

            return tableIdList;

        }

        private List<TableId> GetTableList(IEnumerable<TableData> tableDataList)
        {
            List<TableId> tableIdList = new List<TableId>();
            foreach (TableData tableData in tableDataList)
            {
                bool found = false;
                foreach (TableId tableId in tableIdList)
                {
                    if (tableId.TableName == tableData.TableName)
                    {
                        found = true;
                    }
                }
                if (!found)
                {
                    tableIdList.Add(new TableId
                    {
                        TableName = tableData.TableName,
                        Id = 0
                    });
                }
            }
            return tableIdList;
        }
    }
}
