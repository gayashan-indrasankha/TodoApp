using System;
using System.Collections.Generic;
using System.Text;

namespace TodoApp.Domain.Entities
{
    public enum TodoStatus
    {
        NotStarted,
        InProgress,
        Completed
    }
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public TodoStatus status { get; set; } = TodoStatus.NotStarted;
    }
}
