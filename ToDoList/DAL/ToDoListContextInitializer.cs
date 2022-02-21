using System.Data.Entity;

namespace ToDoList.DAL
{
    public class ToDoListContextInitializer: DropCreateDatabaseIfModelChanges<ToDoListContext>
    {
        protected override void Seed(ToDoListContext context)
        {
            context.ToDoListItems.Add(new Models.ToDoListItem()
            {
                IsDone = false,
                ItemText = "Create web app using Angular, .NET and PostgreSQL"
            });

        }
    }
}
