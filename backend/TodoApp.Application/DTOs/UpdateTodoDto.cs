using System;
using System.Collections.Generic;
using System.Text;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.DTOs
{
    public class UpdateTodoDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public TodoStatus Status { get; set; } = TodoStatus.Active;
    }
}
