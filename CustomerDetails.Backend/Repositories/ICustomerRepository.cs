public interface ICustomerRepository
{
    Task<Customer?> GetCustomer(int id);
    Task<List<Customer>?> GetCustomers();
    Task<Customer?> CreateCustomer(Customer customer);
    Task<Customer?> UpdateCustomer(int id, Customer customer);
    Task<Customer?> DeleteCustomer(int id);
}