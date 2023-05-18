using TodoApi.Models;

public interface ITodoRepository
{
    Task<TodoItem?> GetTodoItem(long id);
    Task<List<TodoItem>> GetTodoItems();
    Task<TodoItem?> PostTodoItem(TodoItem todoItem);
    Task<TodoItem?> PutTodoItem(long id, TodoItem todoItem);
    Task<TodoItem?> DeleteTodoItem(long id);
}