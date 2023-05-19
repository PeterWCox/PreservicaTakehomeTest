using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

public class CustomerRepository : ICustomerRepository
{
    private readonly CustomerContext _context;
    public CustomerRepository(CustomerContext context) => _context = context;

    public async Task<Customer?> GetCustomer(int id)
    {
        try
        {
            Customer? customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return null;
            }

            return customer;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<List<Customer>?> GetCustomers()
    {
        try
        {
            return await _context.Customers.ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public async Task<Customer?> CreateCustomer(Customer customer)
    {
        try
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Customer?> UpdateCustomer(int id, Customer customer)
    {
        try
        {
            Console.WriteLine("id: " + id);
            Console.WriteLine("customer.Id: " + customer.Id);

            if (id != customer.Id)
            {
                Console.WriteLine("Id mismatch");
                return null;
            }

            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return customer;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Customer?> DeleteCustomer(int id)
    {
        try
        {
            Customer? customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return null;
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }


    }

}