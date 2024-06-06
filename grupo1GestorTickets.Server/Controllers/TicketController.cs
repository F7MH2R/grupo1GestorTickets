using grupo1GestorTickets.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using grupo1GestorTickets.Server.DTO;
using grupo1GestorTickets.Server.ServiceEmail;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace grupo1GestorTickets.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly TicketsCTX _context;
        private readonly EmailNotificationService _emailNotificationService;

        public TicketController(TicketsCTX context, EmailNotificationService emailNotificationService)
        {
            _context = context;
            _emailNotificationService = emailNotificationService;
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetTickets(int userId)
        {
            var tickets = await (from t in _context.Tickets
                                 join a in _context.Areas on t.IdArea equals a.Id
                                 join es in _context.Estados on t.IdEstado equals es.Id
                                 where t.IdUsuario == userId
                                 select new
                                 {
                                     id = t.Id,
                                     nombre = t.Nombre,
                                     fechaCreacion = t.FechaCreacion,
                                     descripcion = t.Descripcion,
                                     prioridad = t.Prioridad,
                                     estado = es.Estado1,
                                     area = a.Nombre,
                                 }).ToListAsync();

            return Ok(tickets);
        }





        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] TicketDTO ticketDTO)
        {
            var ticket = new Ticket();
            var area = _context.Areas.Where(a => a.Id == ticketDTO.idArea).First();
            ticket.Nombre = ticketDTO.titulo;
            ticket.Descripcion = ticketDTO.descripcion;
            ticket.IdEstado = ticketDTO.idEstado;
            ticket.IdArea = ticketDTO.idArea;
            ticket.Prioridad = ticketDTO.prioridad;
            ticket.IdUsuario = ticketDTO.idUsuario;
            ticket.FechaCreacion = DateTime.Now;
            ticket.FechaActualizacion = DateOnly.FromDateTime(DateTime.Now);

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
/*
            // Enviar notificación por correo
            var user = await _context.Usuarios.FindAsync(ticket.IdUsuario);
            if (user != null)
            {
                await SendNotification(user.Correo, ticket.Id);

              
            }
           
            await _emailNotificationService.SendNotificationToAdmins(ticket.Id);
*/
            if (ticket.Id != 0) // Assuming 'Id' is an integer and a new ticket will have a non-zero ID
            {
                var user = await _context.Usuarios.FindAsync(ticket.IdUsuario);
                if (user != null)
                {
                    await _emailNotificationService.SendNotification(user.Correo, ticket.Id);
                }

                await _emailNotificationService.SendNotificationToAdmins(ticket.Id);
            }
            return Ok(ticket);
        }

        [HttpPost("{id}/comments")]
        public async Task<IActionResult> AddComments(int id, [FromBody] List<ComentarioDTO> comentariosDTO)
        {
            var ticket = _context.Tickets.FirstOrDefault(t => t.Id == id);
            if (ticket == null)
            {
                return NotFound("Ticket not found");
            }

            foreach (var comentarioDTO in comentariosDTO)
            {
                var comentario = new Comentario
                {
                    Comentario1 = comentarioDTO.Comentario,
                    IdTicket = id,
                    idUsuario = comentarioDTO.IdUsuario,
                    fechaCreacion = DateTime.Now

                };
                _context.Comentarios.Add(comentario);
            }
            await _context.SaveChangesAsync();
            return Ok(comentariosDTO);
        }

        [HttpGet("details/{ticketId}")]
        public async Task<IActionResult> GetTicketDetails(int ticketId)
        {
            var ticketDetails = await (from t in _context.Tickets
                                       join u in _context.Usuarios on t.IdUsuario equals u.Id
                                       join es in _context.Estados on t.IdEstado equals es.Id
                                       join ar in _context.Areas on t.IdArea equals ar.Id
                                       join au in _context.Usuarios on t.IdUsuarioAsignado equals au.Id into auGroup
                                       from au in auGroup.DefaultIfEmpty()
                                       where t.Id == ticketId
                                       select new
                                       {
                                           Areas = ar.Nombre,
                                           Ticket = t,
                                           User = u,
                                           State = es.Estado1,
                                           AssignedUser = au,
                                           Comments = (from c in _context.Comentarios
                                                       join cu in _context.Usuarios on c.idUsuario equals cu.Id
                                                       where c.IdTicket == ticketId
                                                       select new
                                                       {
                                                           c.Id,
                                                           c.Comentario1,
                                                           c.fechaCreacion,
                                                           User = new
                                                           {
                                                               cu.Id,
                                                               cu.Nombre,
                                                               cu.Correo
                                                           }
                                                       }).ToList(),
                                           Files = _context.Archivos.Where(f => f.IdTicket == ticketId).ToList()
                                       }).FirstOrDefaultAsync();

            if (ticketDetails == null)
            {
                return NotFound();
            }

            return Ok(ticketDetails);
        }



        [HttpDelete("{ticketId}/comments/{commentId}")]
        public async Task<IActionResult> DeleteComment(int ticketId, int commentId)
        {
            var comentario = await _context.Comentarios.FindAsync(commentId);
            if (comentario == null || comentario.IdTicket != ticketId)
            {
                return NotFound();
            }

            _context.Comentarios.Remove(comentario);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/files")]
        public async Task<IActionResult> UploadFiles(int id, [FromForm] List<IFormFile> files)
        {
            var ticket = _context.Tickets.FirstOrDefault(t => t.Id == id);
            if (ticket == null)
            {
                return NotFound("Ticket not found");
            }

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    using var ms = new MemoryStream();
                    await file.CopyToAsync(ms);
                    var archivo = new Archivo
                    {
                        Nombre = file.FileName,
                        Contenido = Convert.ToBase64String(ms.ToArray()),
                        Tipo = Path.GetExtension(file.FileName),
                        IdTicket = id
                    };
                    _context.Archivos.Add(archivo);
                }
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{ticketId}/files/{fileId}")]
        public async Task<IActionResult> DeleteFile(int ticketId, int fileId)
        {
            var archivo = await _context.Archivos.FindAsync(fileId);
            if (archivo == null || archivo.IdTicket != ticketId)
            {
                return NotFound();
            }

            _context.Archivos.Remove(archivo);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET: api/tickets/tendencias
        [HttpGet("tendencias")]
        public async Task<ActionResult> GetTicketTrends()
        {
            var trends = new
            {
                Day = await GetTicketsByDay(),
                Trend = await GetTicketsTrend(),
                Month = await GetTicketsByMonth(),
                Completed = await GetCompletedTickets()
            };

            return Ok(trends);
        }

        private async Task<IEnumerable<TrendData>> GetTicketsByDay()
        {
            return await _context.Tickets
                .GroupBy(t => t.FechaCreacion.Date)
                .Select(g => new TrendData
                {
                    Date = g.Key,
                    Value = g.Count()
                })
                .ToListAsync();
        }

        private async Task<IEnumerable<TrendData>> GetTicketsTrend()
        {
            return await (from t in _context.Tickets
                          join a in _context.Areas on t.IdArea equals a.Id
                          group t by new { a.Nombre, t.FechaCreacion.Date } into g
                          select new TrendData
                          {
                              AreaName = g.Key.Nombre,
                              Date = g.Key.Date,
                              Value = g.Count()
                          })
                          .ToListAsync();
        }



        private async Task<IEnumerable<TrendData>> GetTicketsByMonth()
        {
            return await _context.Tickets
                .GroupBy(t => new { t.FechaCreacion.Year, t.FechaCreacion.Month })
                .Select(g => new TrendData
                {
                    Date = new DateTime(g.Key.Year, g.Key.Month, 1),
                    Value = g.Count()
                })
                .ToListAsync();
        }

        private async Task<IEnumerable<TrendData>> GetCompletedTickets()
        {
            return await _context.Tickets
                .Where(t => t.IdEstado == 4) // Assuming 3 is the code for 'Completed'
                .GroupBy(t => t.FechaCreacion.Date)
                .Select(g => new TrendData
                {
                    Date = g.Key,
                    Value = g.Count()
                })
                .ToListAsync();
        }

        public class TrendData
        {
            public string AreaName { get; set; }
            public DateTime Date { get; set; }
            public int Value { get; set; }
        }


        [HttpGet("tickets/{idUsuario}")]
        public async Task<IActionResult> getTicketsById(int idUsuario)
        {
            var tickets = await (from t in _context.Tickets
                                 join u in _context.Usuarios on t.IdUsuario equals u.Id
                                 join ua in _context.Usuarios on t.IdUsuarioAsignado equals ua.Id into uas
                                 from uasgroup in uas.DefaultIfEmpty()
                                 join c in _context.Comentarios on t.Id equals c.IdTicket into cg
                                 from subgroup2 in cg.DefaultIfEmpty()
                                 where (t.IdUsuarioAsignado == idUsuario)
                                 group subgroup2 by new
                                 {
                                     t.Id,
                                     Creado = u.Nombre,
                                     t.Prioridad,
                                     t.FechaCreacion,
                                     Asignado = uasgroup.Nombre,
                                     idAsignado = uasgroup.Id,
                                     Titulo = t.Nombre
                                 } into g
                                 select new
                                 {
                                     idTicket = g.Key.Id,
                                     creadoPor = g.Key.Creado,
                                     prioridad = g.Key.Prioridad,
                                     fechaCreacion = g.Key.FechaCreacion.ToShortDateString(),
                                     usuarioAsignado = g.Key.Asignado,
                                     idUsuarioAsignado = g.Key.idAsignado,
                                     accion = g.Key.Titulo,
                                     comentarios = g.Where(c => c != null).ToList()
                                 }).ToListAsync();

            if(tickets == null)
            {
                return NotFound();
            }

            return Ok(tickets);
        }
   
    }
}
