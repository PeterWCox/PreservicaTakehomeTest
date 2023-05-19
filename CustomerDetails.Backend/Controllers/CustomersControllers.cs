using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace CustomerDetails.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _service;
        private readonly IValidator<Customer> _validator;

        public CustomersController(ICustomerService service, IValidator<Customer> validator)
        {
            _service = service;
            _validator = validator;
        }

        // GET: api/Customers/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var Customer = await _service.GetCustomer(id);

            if (Customer == null)
            {
                return NotFound();
            }

            return Ok(Customer);
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var customers = await _service.GetCustomers();

            if (customers == null)
            {
                //Return a 500 error
                return StatusCode(500, "Internal server error");
            }

            return Ok(customers);
        }

        // POST: api/Customers
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer Customer)
        {
            var x = _validator.Validate(Customer);

            if (!x.IsValid)
            {
                return BadRequest(x.Errors);
            }

            var newCustomer = await _service.CreateCustomer(Customer);

            if (newCustomer == null)
            {
                return StatusCode(500, "Internal server error");
            }

            return Ok(Customer);
        }


        // PUT: api/Customers/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            // Validate the Customer using FluentValidation
            var x = _validator.Validate(customer);

            if (!x.IsValid)
            {
                return BadRequest(x.Errors);
            }

            var updatedCustomer = await _service.UpdateCustomer(id, customer);

            if (updatedCustomer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }



        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var deletedCustomer = await _service.DeleteCustomer(id);

            if (deletedCustomer == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
