using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace CustomerDetails.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly ITodoRepository _repository;

        public TodoItemsController(ITodoRepository repository)
        {
            _repository = repository;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            var todoItems = await _repository.GetTodoItems();
            if (todoItems == null) return NotFound();
            return todoItems;
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = await _repository.GetTodoItem(id);
            if (todoItem == null) return NotFound();
            return todoItem;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem? todoItem)
        {
            if (todoItem == null) return BadRequest();
            if (id != todoItem.Id) return BadRequest();
            var updatedTodoItem = await _repository.GetTodoItem(id);
            if (updatedTodoItem == null) return NotFound();
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            var newTodoItem = await _repository.PostTodoItem(todoItem);
            if (newTodoItem == null) return NotFound();
            return CreatedAtAction(nameof(GetTodoItem), new { id = newTodoItem.Id }, newTodoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var deletedTodoItem = await _repository.DeleteTodoItem(id);
            if (deletedTodoItem == null) return NotFound();
            return NoContent();
        }
    }
}
