using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using ToDoList.DAL;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    public class ToDoListItemController: Controller
    {
        private ToDoListContext _context;
        public ToDoListItemController(ToDoListContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IList<ToDoListItem>>> GetToDoListItems()
        {
            return Ok(await _context.ToDoListItems.ToArrayAsync());
        }
    }
}
