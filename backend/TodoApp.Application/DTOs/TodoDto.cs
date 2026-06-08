using System;
using System.Collections.Generic;
using System.Text;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.DTOs
{
    public class TodoDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public TodoStatus status { get; set; } = TodoStatus.Active;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
