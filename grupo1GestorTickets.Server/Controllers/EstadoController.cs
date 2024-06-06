using grupo1GestorTickets.Server.Models;
using grupo1GestorTickets.Server.ServiceEmail;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController : ControllerBase
    {
        private readonly TicketsCTX _context;
        private readonly EmailNotificationService _emailNotificationService;

        public EstadoController(TicketsCTX context, EmailNotificationService emailNotificationService)
        {
            _context = context;
            _emailNotificationService = emailNotificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEstados()
        {
            var estados = await _context.Estados
                                        .Select(e => new { e.Id, e.Estado1 })
                                        .ToListAsync();

            return Ok(estados);
        }

    }
}
