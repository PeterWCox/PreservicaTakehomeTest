using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

//ASP.NET Boilerplate
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//To-do Domain-specific boiler-plate
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseInMemoryDatabase("TodoList"));

//Customer Domain-specific boiler-plate
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddDbContext<CustomerContext>(opt =>
    opt.UseInMemoryDatabase("Customer"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();