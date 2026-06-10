using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Services;
using TodoApp.Application.DTOs;


namespace TodoApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : Controller
    {
        private readonly ITodoService _todoService;
        public TodosController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var todos = _todoService.GetAll();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var todo = _todoService.GetById(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateTodoDto createTodoDto)
        {
            var Createdtodo = _todoService.Create(createTodoDto);
            return Ok(Createdtodo);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateTodoDto updateTodoDto)
        {
            var Updatedtodo = _todoService.Update(id, updateTodoDto);
            if (Updatedtodo == null)
            {
                return NotFound();
            }
            return Ok(Updatedtodo);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var isDeleted = _todoService.Delete(id);
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
