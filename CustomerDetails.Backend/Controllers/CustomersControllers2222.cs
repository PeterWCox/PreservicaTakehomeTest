using Microsoft.AspNetCore.Mvc;

namespace CustomerDetails.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _service;

        public CustomersController(ICustomerService service)
        {
            _service = service;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var Customers = await _service.GetCustomers();
            if (Customers == null) return NotFound();
            return Customers;
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var Customer = await _service.GetCustomer(id);
            if (Customer == null) return NotFound();
            return Customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer? Customer)
        {
            if (Customer == null) return BadRequest();
            if (id != Customer.Id) return BadRequest();
            var updatedCustomer = await _service.GetCustomer(id);
            if (updatedCustomer == null) return NotFound();
            return NoContent();
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer Customer)
        {
            var newCustomer = await _service.CreateCustomer(Customer);
            if (newCustomer == null) return NotFound();
            return CreatedAtAction(nameof(GetCustomer), new { id = newCustomer.Id }, newCustomer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var deletedCustomer = await _service.DeleteCustomer(id);
            if (deletedCustomer == null) return NotFound();
            return NoContent();
        }
    }
}
