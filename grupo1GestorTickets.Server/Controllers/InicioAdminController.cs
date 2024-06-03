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
            var tickets = await (from t in _context.Tickets
                                 join u in _context.Usuarios on t.IdUsuario equals u.Id
                                 join ua in _context.Usuarios on t.IdUsuarioAsignado equals ua.Id into uas
                                 from uasgroup in uas.DefaultIfEmpty()
                                 join c in _context.Comentarios on t.Id equals c.IdTicket into cg
                                 from subgroup2 in cg.DefaultIfEmpty()
                                 group subgroup2 by new
                                 {
                                     t.Id,
                                     Creado = u.Nombre,
                                     t.Prioridad,
                                     t.FechaCreacion,
                                     Asignado = uasgroup.Nombre,
                                     Titulo = t.Nombre
                                 } into g
                                 select new
                                 {
                                     idTicket = g.Key.Id,
                                     creadoPor = g.Key.Creado,
                                     prioridad = g.Key.Prioridad,
                                     fechaCreacion = g.Key.FechaCreacion.ToShortDateString(),
                                     usuarioAsignado = g.Key.Asignado,
                                     accion = g.Key.Titulo,
                                     comentarios = g.Where(c => c != null).ToList()
                                 }).ToListAsync();
            var cantidadAbiertos = await ObtenerTicketsxEstado("abierto");
            var cantidadCerrados = await ObtenerTicketsxEstado("cerrado");
            var cantidadEnProceso = await ObtenerTicketsxEstado("cerrado");
            var cantidadSinAsignar = await TicketsSinAsignar();
            //
            return Ok(new {
                abiertos = cantidadAbiertos.Count,
                cerrados = cantidadCerrados.Count,
                enProceso = cantidadEnProceso.Count,
                sinAsignar = cantidadSinAsignar.Count,
                tickets,
            });
        }



        private Task<List<Ticket>> ObtenerTicketsxEstado(string estado)
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

        private Task<List<Ticket>> TicketsSinAsignar()
        {
            return (from t in _context.Tickets
                     where t.IdUsuarioAsignado == null
                     select t
                ).ToListAsync();
        }
    }
}
