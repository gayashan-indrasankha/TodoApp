using System;
using System.Collections.Generic;
using System.Text;

namespace TodoApp.Domain.Entities
{
    public enum TodoStatus
    {
        Active,
        Completed
    }
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public TodoStatus Status { get; set; } = TodoStatus.Active;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
    }
}
