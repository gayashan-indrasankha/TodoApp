using System;
using System.Collections.Generic;
using System.Text;
using TodoApp.Application.DTOs;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Interfaces
{
    public interface ITodoRepository
    {
        List<Todo> GetAll();
        Todo? GetById(int id);
        Todo Add(Todo todo_item);
        Todo? Update(Todo todo_item);
        bool Delete(int id);
    }
}
