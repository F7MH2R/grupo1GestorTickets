using grupo1GestorTickets.Server.Models;
using grupo1GestorTickets.Server.ServiceEmail;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
        private readonly TicketsCTX _context;

        public UsuarioController(TicketsCTX context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var usuarios = await (from t in _context.Usuarios
                                 select new
                                 {
                                     id = t.Id,
                                     nombre = t.Nombre,
                                     tipo = t.tipo_usuario,
                                     telefono = t.Telefono,
                                     cargo = t.Cargo,
                                     creacion = t.FechaCreacion
                                 }).ToListAsync();

            return Ok(usuarios);
        }
    }
}
