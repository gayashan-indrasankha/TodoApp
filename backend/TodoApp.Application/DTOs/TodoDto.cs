using System;
using System.Collections.Generic;
using System.Text;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.DTOs
{
    public class TodoDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public TodoStatus Status { get; set; } = TodoStatus.Active;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
