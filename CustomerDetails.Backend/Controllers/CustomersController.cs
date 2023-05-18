using Microsoft.AspNetCore.Mvc;

namespace CustomerDetails.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _repository;

        public CustomersController(ICustomerRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var Customers = await _repository.GetCustomers();
            if (Customers == null) return NotFound();
            return Customers;
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(long id)
        {
            var Customer = await _repository.GetCustomer(id);
            if (Customer == null) return NotFound();
            return Customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(long id, Customer? Customer)
        {
            if (Customer == null) return BadRequest();
            if (id != Customer.Id) return BadRequest();
            var updatedCustomer = await _repository.GetCustomer(id);
            if (updatedCustomer == null) return NotFound();
            return NoContent();
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer Customer)
        {
            var newCustomer = await _repository.PostCustomer(Customer);
            if (newCustomer == null) return NotFound();
            return CreatedAtAction(nameof(GetCustomer), new { id = newCustomer.Id }, newCustomer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(long id)
        {
            var deletedCustomer = await _repository.DeleteCustomer(id);
            if (deletedCustomer == null) return NotFound();
            return NoContent();
        }
    }
}
