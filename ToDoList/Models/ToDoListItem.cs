using System.ComponentModel.DataAnnotations;

namespace ToDoList.Models
{
    public class ToDoListItem
    {
        [Key]
        public int Id { get; set; }
        public string? ItemText { get; set; }
        public bool IsDone { get; set; }
    }
}
