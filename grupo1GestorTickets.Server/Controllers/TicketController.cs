using grupo1GestorTickets.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MailKit.Net.Smtp;
using MimeKit;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Net.Sockets;

namespace grupo1GestorTickets.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TicketController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await _context.Ticket.Include(t => t.Estado).ToListAsync();
            return Ok(tickets);
        }

        [HttpGet("{userId}/tickets")]
        public async Task<IActionResult> GetTicketsByUser(int userId)
        {
            var tickets = await _context.Ticket.Include(t => t.Estado).Where(t => t.IdUsuario == userId).ToListAsync();
            return Ok(tickets);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] Ticket ticket)
        {
            ticket.FechaCreacion = DateTime.Now;
            _context.Ticket.Add(ticket);
            await _context.SaveChangesAsync();

            // Enviar notificación por correo
            var user = await _context.Usuario.FindAsync(ticket.IdUsuario);
            if (user != null)
            {
                await SendNotification(user.Correo, ticket.Id);
            }

            return Ok(ticket);
        }

        [HttpPost("{id}/comments")]
        public async Task<IActionResult> AddComment(int id, [FromBody] Comentario comentario)
        {
            comentario.IdTicket = id;
            _context.Comentario.Add(comentario);
            await _context.SaveChangesAsync();
            return Ok(comentario);
        }

        [HttpDelete("{ticketId}/comments/{commentId}")]
        public async Task<IActionResult> DeleteComment(int ticketId, int commentId)
        {
            var comentario = await _context.Comentario.FindAsync(commentId);
            if (comentario == null || comentario.IdTicket != ticketId)
            {
                return NotFound();
            }

            _context.Comentario.Remove(comentario);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/files")]
        public async Task<IActionResult> UploadFiles(int id, [FromForm] List<IFormFile> files)
        {
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
                    _context.Archivo.Add(archivo);
                }
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{ticketId}/files/{fileId}")]
        public async Task<IActionResult> DeleteFile(int ticketId, int fileId)
        {
            var archivo = await _context.Archivo.FindAsync(fileId);
            if (archivo == null || archivo.IdTicket != ticketId)
            {
                return NotFound();
            }

            _context.Archivo.Remove(archivo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
