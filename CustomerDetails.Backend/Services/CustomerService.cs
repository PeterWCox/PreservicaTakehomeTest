public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repo;


    public CustomerService(ICustomerRepository repo) => _repo = repo;

    public async Task<List<Customer>?> GetCustomers()
    {
        return await _repo.GetCustomers();
    }

    public async Task<Customer?> GetCustomer(int id)
    {
        return await _repo.GetCustomer(id);
    }

    public async Task<Customer?> CreateCustomer(Customer customer)
    {
        return await _repo.CreateCustomer(customer);
    }

    public async Task<Customer?> UpdateCustomer(int id, Customer customer)
    {
        return await _repo.UpdateCustomer(id, customer);
    }

    public async Task<Customer?> DeleteCustomer(int id)
    {
        return await _repo.DeleteCustomer(id);
    }

}