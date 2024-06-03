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
                    IdTicket = id
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
                                           Comments = _context.Comentarios.Where(c => c.IdTicket == ticketId).ToList(),
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

        private async Task SendNotification(string email, int ticketId)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("System Ticket", "gestion.ticket.grupo01@gmail.com"));
            message.To.Add(new MailboxAddress("User", email)); // Corregido para usar dos argumentos
            message.Subject = "Ticket Creado";
            message.Body = new TextPart("plain")
            {
                Text = $"Su ticket con ID {ticketId} ha sido creado correctamente."
            };

            using var client = new MailKit.Net.Smtp.SmtpClient();  // Usa MailKit.Net.Smtp.SmtpClient
                                                                   // Conectar al servidor SMTP de Gmail
            await client.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);

            // Autenticar con el servidor SMTP utilizando el correo electrónico y la contraseña
            await client.AuthenticateAsync("gestion.ticket.grupo01@gmail.com", "rugl rtch bkyw vcsv");

            // Enviar el mensaje
            await client.SendAsync(message);

            // Desconectar del servidor SMTP
            await client.DisconnectAsync(true);
        }
        /*
       public async Task SendNotificationToAdmins(int ticketId)
  {
      using (var dbContext = new TicketsCTX()) // Reemplaza 'YourDbContext' con el nombre de tu contexto de base de datos
      {
          var admins = await dbContext.Usuarios.Where(u => u.tipo_usuario == 1).ToListAsync();

          foreach (var admin in admins)
          {
              var message = new MimeMessage();
              message.From.Add(new MailboxAddress("System Ticket", "gestion.ticket.grupo01@gmail.com"));
              message.To.Add(new MailboxAddress("Admin", admin.Correo));
              message.Subject = "Nuevo Ticket Sin Asignar";

              var bodyBuilder = new BodyBuilder();
              bodyBuilder.HtmlBody = "<h1>¡Nuevo Ticket Sin Asignar!</h1>" +
                                     "<p>Se ha creado un nuevo ticket de un cliente sin asignar.</p>" +
                                     "<p><img src=\"https://i.ibb.co/C2Nxxyb/2-P-ginas-Web-Gestor-de-Proyecto-Final.png\" alt=\"Logo\"></p>";

              message.Body = bodyBuilder.ToMessageBody();

              using var client = new MailKit.Net.Smtp.SmtpClient();
              await client.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
              await client.AuthenticateAsync("gestion.ticket.grupo01@gmail.com", "rugl rtch bkyw vcsv");
              await client.SendAsync(message);
              await client.DisconnectAsync(true);
          }
      }
  }
        */
    }
}
