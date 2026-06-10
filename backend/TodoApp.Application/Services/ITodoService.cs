using TodoApp.Application.DTOs;

namespace TodoApp.Application.Services
{
    public interface ITodoService
    {
        List<TodoDto> GetAll();
        TodoDto? GetById(int id);
        TodoDto Create(CreateTodoDto todo_item);
        TodoDto? Update(int id,UpdateTodoDto todo_item);
        bool Delete(int id);
    }
}
