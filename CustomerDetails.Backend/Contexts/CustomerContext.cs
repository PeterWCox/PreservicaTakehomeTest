using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models;

public class CustomerContext : DbContext
{
    public CustomerContext(DbContextOptions<CustomerContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // var fakeCustomers = new List<Customer>();

        // for (var i = 1; i < 100; i++)
        // {
        //     //Generate a random number between 200 and 400
        //     var random = new Random();
        //     var width = random.Next(200, 400);
        //     var height = random.Next(200, 400);

        //     var customer = new Customer
        //     {
        //         Id = i,
        //         Name = Faker.Name.FullName(),
        //         PhoneNumber = Faker.Phone.Number(),
        //         Email = Faker.Internet.Email(),
        //         ProfilePhoto = $"https://unsplash.it/${width}/${height}"
        //     };

        //     fakeCustomers.Add(customer);
        // }

        // Console.WriteLine(fakeCustomers.Count);

        //seed the database
        modelBuilder.Entity<Customer>().HasData(new
        {
            Id = 1,
            Name = "Peter Cox",
            PhoneNumber = "1234567890",
            Email = "p.cox@outlook.com",
            ProfilePhoto = "https://unsplash.it/200/300"
        });


    }

    public DbSet<Customer> Customers { get; set; } = null!;
}