using FluentValidation;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repo;
    private readonly IValidator<Customer> _validator;

    public CustomerService(ICustomerRepository repo, IValidator<Customer> validator)
    {
        _repo = repo;
        _validator = validator;
    }

    public async Task<List<Customer>> GetCustomers()
    {
        return await _repo.GetCustomers();
    }

    public async Task<Customer> GetCustomer(int id)
    {
        return await _repo.GetCustomer(id);
    }

    public async Task<Customer> CreateCustomer(Customer customer)
    {
        var x = _validator.ValidateAsync(customer);

        if (!x.Result.IsValid) throw new Exception(x.Result.Errors[0].ErrorMessage);

        await _validator.ValidateAndThrowAsync(customer);
        return await _repo.CreateCustomer(customer);
    }

    public async Task<Customer> UpdateCustomer(int id, Customer customer)
    {
        return await _repo.UpdateCustomer(id, customer);
    }

    public async Task<Customer> DeleteCustomer(int id)
    {
        return await _repo.DeleteCustomer(id);
    }

}