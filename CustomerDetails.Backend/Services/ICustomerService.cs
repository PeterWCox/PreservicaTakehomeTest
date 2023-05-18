public interface ICustomerService
{
    Task<Customer?> GetCustomer(long id);
    Task<List<Customer>> GetCustomers();
    Task<Customer> PostCustomer(Customer customer);
    Task<Customer?> PutCustomer(long id, Customer customer);
    Task<Customer?> DeleteCustomer(long id);
}