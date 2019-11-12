using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sandbox.Models;
using SandboxAPI.CustomModels;

namespace SandboxAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageQuestionsMappingsController : ControllerBase
    {
        private readonly DynamicAppContext _context;

        public PageQuestionsMappingsController(DynamicAppContext context)
        {
            _context = context;
        }

        //// GET: api/PageQuestionsMappings
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<PageQuestionsMapping>>> GetPageQuestionsMapping()
        //{
        //    return await _context.PageQuestionsMapping.ToListAsync();
        //}

        //// GET: api/PageQuestionsMappings/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<PageQuestionsMapping>> GetPageQuestionsMapping(int? id)
        //{
        //    var pageQuestionsMapping = await _context.PageQuestionsMapping.FindAsync(id);

        //    if (pageQuestionsMapping == null)
        //    {
        //        return NotFound();
        //    }

        //    return pageQuestionsMapping;
        //}

        //// PUT: api/PageQuestionsMappings/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutPageQuestionsMapping(int? id, PageQuestionsMapping pageQuestionsMapping)
        //{
        //    if (id != pageQuestionsMapping.DisplayOrder)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(pageQuestionsMapping).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PageQuestionsMappingExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/PageQuestionsMappings
        [HttpPost]
        public async Task<ActionResult<IEnumerable<PageQuestionsMapping>>> PostPageQuestionsMapping(QuestionQuery questionQuery)
        {
            List<PageQuestionsMapping> pageQuestionsMappingList = new List<PageQuestionsMapping>();
            List<Question> questions = _context.Question.ToList();
            List<QuestionMappingText> questionMappingTexts = _context.QuestionMappingText.ToList();
            List<QuestionMapping> questionMappings = _context.QuestionMapping.Where(x => x.PageGroupId == questionQuery.PageGroupId &&
                                                                             x.PageId == questionQuery.PageId &&
                                                                             x.InUse == true)
                                                                            .OrderBy(x => x.DisplayOrder).ToList();
            foreach (QuestionMapping questionMapping in questionMappings)
            {
                PageQuestionsMapping pageQuestionsMapping = new PageQuestionsMapping
                {
                    PageGroupId = questionMapping.PageGroupId.HasValue ? (int)questionMapping.PageGroupId : 0,
                    PageId = questionMapping.PageId.HasValue ? (int)questionMapping.PageId : 0,
                    DisplayOrder = questionMapping.DisplayOrder.HasValue ? (int)questionMapping.DisplayOrder : 0,
                    OptionNextList = string.IsNullOrWhiteSpace(questionMapping.OptionNextList) ? "" : questionMapping.OptionNextList,
                    OptionTextList = string.IsNullOrWhiteSpace(questionMapping.OptionTextList) ? "" : questionMapping.OptionTextList,
                    NextQuestion = questionMapping.NextQuestion.HasValue ? (int)questionMapping.NextQuestion : 0,
                    RepeatNext = questionMapping.RepeatNext.HasValue ? (int)questionMapping.RepeatNext : 0,
                    ObjectTypeId = questionMapping.ObjectTypeId.HasValue ? (int)questionMapping.ObjectTypeId : 0,
                    Columns = questionMapping.Columns.HasValue ? (int)questionMapping.Columns : 0,
                    ScreenColumns = questionMapping.ScreenColumns.HasValue ? (int)questionMapping.ScreenColumns : 0,
                    FieldName = string.IsNullOrWhiteSpace(questionMapping.FieldName) ? "" : questionMapping.FieldName,
                    TableName = string.IsNullOrWhiteSpace(questionMapping.TableName) ? "" : questionMapping.TableName,

                    ColumnName = string.IsNullOrWhiteSpace(questionMapping.ColumnName) ? "" : questionMapping.ColumnName,
                    ReferenceTable = string.IsNullOrWhiteSpace(questionMapping.ReferenceTable) ? "" : questionMapping.ReferenceTable,
                    ReferenceId = questionMapping.ReferenceId.HasValue ? (int)questionMapping.ReferenceId : 0,
                    MaxSize = questionMapping.MaxSize.HasValue ? (int)questionMapping.MaxSize : 0,
                    Mandatory = questionMapping.Mandatory.HasValue ? (bool)questionMapping.Mandatory : false,
                    InUse = questionMapping.InUse.HasValue ? (bool)questionMapping.InUse : false
                };

                foreach (Question question in questions)
                {
                    if (question.QuestionId == questionMapping.QuestionId)
                    {
                        pageQuestionsMapping.QuestionText = question.QuestionText;
                        break;
                    }
                }
                foreach (QuestionMappingText questionMappingText in questionMappingTexts)
                {
                    if (questionMappingText.QuestionMappingId == questionMapping.QuestionMappingId)
                    {
                        pageQuestionsMapping.HelpText = string.IsNullOrWhiteSpace(questionMappingText.HelpText) ? "" : questionMappingText.HelpText;
                        pageQuestionsMapping.MandatoryText = string.IsNullOrWhiteSpace(questionMappingText.MandatoryText) ? "" : questionMappingText.MandatoryText;
                        pageQuestionsMapping.FormatTypeId = questionMappingText.FormatTypeId.HasValue ? (int)questionMappingText.FormatTypeId : 0;
                        pageQuestionsMapping.DecimalPlaces = questionMappingText.DecimalPlaces.HasValue ? (int)questionMappingText.DecimalPlaces : 0;
                        pageQuestionsMapping.DdlTypeId = questionMappingText.DdlTypeId.HasValue ? (int)questionMappingText.DdlTypeId : 0;
                        break;
                    }
                }
                pageQuestionsMappingList.Add(pageQuestionsMapping);
            }
            return pageQuestionsMappingList;
        }

        //// DELETE: api/PageQuestionsMappings/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<PageQuestionsMapping>> DeletePageQuestionsMapping(int? id)
        //{
        //    var pageQuestionsMapping = await _context.PageQuestionsMapping.FindAsync(id);
        //    if (pageQuestionsMapping == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.PageQuestionsMapping.Remove(pageQuestionsMapping);
        //    await _context.SaveChangesAsync();

        //    return pageQuestionsMapping;
        //}

        //private bool PageQuestionsMappingExists(int? id)
        //{
        //    return _context.PageQuestionsMapping.Any(e => e.DisplayOrder == id);
        //}
    }
}
