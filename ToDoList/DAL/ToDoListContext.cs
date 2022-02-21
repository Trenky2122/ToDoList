using System.Data.Entity;
using ToDoList.Models;

namespace ToDoList.DAL
{
    public class ToDoListContext: DbContext
    {
        public ToDoListContext(): base("ToDoListContext")
        {
            Database.SetInitializer<ToDoListContext>(new ToDoListContextInitializer());
        }

        public DbSet<ToDoListItem> ToDoListItems { get; set; }

    }
}
