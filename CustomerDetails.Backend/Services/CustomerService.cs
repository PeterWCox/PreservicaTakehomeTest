public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repo;

    public CustomerService(ICustomerRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Customer>> GetCustomers()
    {
        return await _repo.GetCustomers();
    }

    public async Task<Customer?> GetCustomer(long id)
    {
        return await _repo.GetCustomer(id);
    }

    public async Task<Customer> PostCustomer(Customer customer)
    {
        return await _repo.PostCustomer(customer);
    }

    public async Task<Customer?> PutCustomer(long id, Customer customer)
    {
        return await _repo.PutCustomer(id, customer);
    }

    public async Task<Customer?> DeleteCustomer(long id)
    {
        return await _repo.DeleteCustomer(id);
    }

}