using System.ComponentModel.DataAnnotations;

namespace ToDoList.Models
{
    public class ToDoListItem
    {
        [Key]
        public Guid Id { get; set; }
        public string? ItemText { get; set; }
        public bool IsDone { get; set; }
    }
}
