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
        private readonly ApplicationDbContext _context;

        public InicioAdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await _context.Ticket.Include(t => t.Estado).ToListAsync();
            var ticketsAbiertos = await _context.Ticket.Include(t => t.Estado).Where(ticket => ticket.Estado.Nombre.Equals("Abierto")).CountAsync();
            var ticketsEnProceso = await _context.Ticket.Include(t => t.Estado).Where(ticket => ticket.Estado.Nombre.Equals("En Proceso")).CountAsync();
            return Ok(new {
                tickets,
                ticketsAbiertos,
                ticketsEnProceso
            });
        }
    }
}
