using grupo1GestorTickets.Server.Models;
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
            var cantidadAbiertos = await obtenerTicketsxEstado("abierto");
            var cantidadCerrados = await obtenerTicketsxEstado("cerrado");
            var cantidadEnProceso = await obtenerTicketsxEstado("cerrado");
            var cantidadSinAsignar = await ticketsSinAsignar();
            //
            return Ok(new {
                abiertos = cantidadAbiertos.Count,
                cerrados = cantidadCerrados.Count,
                enProceso = cantidadEnProceso.Count,
                sinAsignar = cantidadSinAsignar.Count,
                tickets,
            });
        }



        private Task<List<Ticket>> obtenerTicketsxEstado(string estado)
        {
            return (from
                        t in _context.Tickets
                    join
                        e in _context.Estados
                    on 
                        t.IdEstado equals e.Id
                    where 
                        (e.Estado1.ToLower() == estado)
                    select 
                        t
                    ).ToListAsync();
        }

        private Task<List<Ticket>> ticketsSinAsignar()
        {
            return (from t in _context.Tickets
                     where t.IdUsuarioAsignado == null
                     select t
                ).ToListAsync();
        }
    }
}
