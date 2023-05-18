using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

public class CustomerRepository : ICustomerRepository
{
    private readonly CustomerContext _context;

    public CustomerRepository(CustomerContext context)
    {
        _context = context;
    }

    public async Task<List<Customer>> GetCustomers()
    {
        try
        {
            if (_context.Customers == null) return new List<Customer>();
            return await _context.Customers.ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Customer?> GetCustomer(long id)
    {
        try
        {
            Customer? customer = await _context.Customers.FindAsync(id);
            if (customer == null) return null;
            return customer;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Customer> PostCustomer(Customer customer)
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

    public async Task<Customer?> PutCustomer(long id, Customer customer)
    {
        try
        {
            _context.Entry(customer).State = EntityState.Modified;
            if (_context.Customers == null) return null;
            var updatedCustomer = await _context.Customers.FindAsync(id);
            return updatedCustomer;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Customer?> DeleteCustomer(long id)
    {
        try
        {
            if (_context.Customers == null) return null;
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return null;
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