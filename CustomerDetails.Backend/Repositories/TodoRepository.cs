using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

public class TodoRepository : ITodoRepository
{
    private readonly TodoContext _context;

    public TodoRepository(TodoContext context)
    {
        _context = context;
    }

    public async Task<List<TodoItem>> GetTodoItems()
    {
        try
        {
            if (_context.TodoItems == null) return new List<TodoItem>();
            return await _context.TodoItems.ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<TodoItem?> GetTodoItem(long id)
    {
        try
        {
            TodoItem? todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null) return null;
            return todoItem;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<TodoItem?> PostTodoItem(TodoItem todoItem)
    {
        try
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();
            return todoItem;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<TodoItem?> PutTodoItem(long id, TodoItem todoItem)
    {
        try
        {
            _context.Entry(todoItem).State = EntityState.Modified;
            if (_context.TodoItems == null) return null;
            var updatedTodoItem = await _context.TodoItems.FindAsync(id);
            return updatedTodoItem;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<TodoItem?> DeleteTodoItem(long id)
    {
        try
        {
            if (_context.TodoItems == null) return null;
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null) return null;
            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

}