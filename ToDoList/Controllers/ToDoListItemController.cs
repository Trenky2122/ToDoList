using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using ToDoList.DAL;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoListItemController: Controller
    {
        private ToDoListContext _context;
        public ToDoListItemController(ToDoListContext context)
        {
            _context = context;
        }

        [HttpGet("GetToDoListItems")]
        public async Task<ActionResult<IList<ToDoListItem>>> GetToDoListItems()
        {
            return Ok(await _context.ToDoListItems.ToArrayAsync());
        }

        [HttpPost("CreateToDoListItem")]
        public async Task<ActionResult<ToDoListItem>> CreateToDoListItem([FromBody] ToDoListItem item)
        {
            if (item.Id != 0)
                return BadRequest();
            _context.ToDoListItems.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("EditToDoListItem")]
        public async Task<ActionResult<ToDoListItem>> EditToDoListItem([FromBody] ToDoListItem item)
        {
            var itemOld = await _context.ToDoListItems.FindAsync(item.Id);
            if(itemOld == null)
                return NotFound();
            itemOld.ItemText = item.ItemText;
            itemOld.IsDone = item.IsDone;
            await _context.SaveChangesAsync();
            return Ok(itemOld);
        }

        [HttpDelete("DeleteToDoListItem/{itemId}")]
        public async Task<ActionResult<ToDoListItem>> DeleteToDoListItem(int itemId)
        {
            var itemOld = await _context.ToDoListItems.FindAsync(itemId);
            if (itemOld == null)
                return NotFound();
            _context.ToDoListItems.Remove(itemOld);
            return Ok(itemOld);
        }
    }
}
