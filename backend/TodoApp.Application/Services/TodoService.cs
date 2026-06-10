using TodoApp.Application.Interfaces;
using TodoApp.Application.DTOs;
using TodoApp.Domain.Entities;


namespace TodoApp.Application.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _TodoRepository; //Reference to the repository that use for access the database. This is a Variable. (Inject)
        public TodoService(ITodoRepository TodoRepository) //Constructor that use for initialize the repository variable.
        {
            _TodoRepository = TodoRepository;
        }

        public List<TodoDto> GetAll() {             
            var todos = _TodoRepository.GetAll();

            var todoDtos = new List<TodoDto>();

            foreach (var todo in todos)
            {
                var todoDto = new TodoDto()
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    status = todo.status,
                    CreatedAt = todo.CreatedAt
                };
                todoDtos.Add(todoDto);
            }
            return todoDtos;
        } 

        public TodoDto? GetById(int id)
        {
            var todo = _TodoRepository.GetById(id);
            if (todo == null)
            {
                return null;
            }
            var todoDto = new TodoDto()
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                status = todo.status,
                CreatedAt = todo.CreatedAt
            };
            return todoDto;
        }

        public TodoDto Create(CreateTodoDto createTodoDto)
        {
            if (String.IsNullOrWhiteSpace(createTodoDto.Title))
            {
                throw new Exception("Title is required");
            }
            var todo = new Todo()
            {
                Title = createTodoDto.Title,
                Description = createTodoDto.Description,
                status = createTodoDto.Status
            };
           
            var createdTodo = _TodoRepository.Add(todo);

            var todoDto = new TodoDto()
            {
                Id = createdTodo.Id,
                Title = createdTodo.Title,
                Description = createdTodo.Description,
                status = createdTodo.status,
                CreatedAt = createdTodo.CreatedAt
            };

            return todoDto;
        }

        public TodoDto? Update(int id, UpdateTodoDto updateTodoDto)
        {
            var existingTodo = _TodoRepository.GetById(id);

            if (existingTodo == null) {
                return null;
            }

            if (String.IsNullOrWhiteSpace(updateTodoDto.Title))
            {
                throw new Exception("Title is required");
            }

            existingTodo.Title = updateTodoDto.Title;
            existingTodo.Description = updateTodoDto.Description;
            existingTodo.status = updateTodoDto.status;

            var updatedTodo = _TodoRepository.Update(existingTodo);

            if (updatedTodo == null) 
            {  
                return null;
            }

            var todoDto = new TodoDto()
            {
                Id = updatedTodo.Id,
                Title = updatedTodo.Title,
                Description = updatedTodo.Description,
                status = updatedTodo.status,
                CreatedAt = updatedTodo.CreatedAt
            };
            return todoDto;
        }

        public bool Delete(int id)
        {
            return _TodoRepository.Delete(id);
        }
    }
}
