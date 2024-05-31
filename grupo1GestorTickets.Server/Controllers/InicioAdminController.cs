using grupo1GestorTickets.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InicioAdminController : ControllerBase
    {
        private readonly TicketsCTX _context;

        public InicioAdminController(TicketsCTX context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await _context.Tickets.ToListAsync();
            //
            return Ok(new {
                tickets
            });
        }
    }
}
