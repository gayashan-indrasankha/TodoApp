using TodoApp.Application.Interfaces;
using TodoApp.Domain.Entities;


//this class hadles the CRUD data operations.
namespace TodoApp.Infrastructure.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly Data.TodoDbContext _context;
        public TodoRepository(Data.TodoDbContext context)
        {
            _context = context;
        }

        public List<Todo> GetAll()
        {
            return _context.Todos.ToList();
        }

        public Todo? GetById(int id)
        {
            return _context.Todos.Find(id);
        }

        public Todo Add(Todo todo_item)
        {
            _context.Todos.Add(todo_item);
            _context.SaveChanges();
            return todo_item;
        }

        public Todo Update(TodoApp.Domain.Entities.Todo todo_item)
        {
            _context.Todos.Update(todo_item);
            _context.SaveChanges();
            return todo_item;
        }

        public bool Delete(int id)
        {
            var todo_item = _context.Todos.Find(id);
            if (todo_item != null)
            {
                _context.Todos.Remove(todo_item);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
