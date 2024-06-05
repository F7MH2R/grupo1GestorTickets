using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using grupo1GestorTickets.Server.Models;
namespace grupo1GestorTickets.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly TicketsCTX _context;

        public UsuarioController(TicketsCTX context)
        {
            _context = context;
        }

        // GET: api/usuario/empleados
        [HttpGet("empleados")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetEmpleados()
        {
            var empleados = await _context.Usuarios
                                          .Where(u => u.tipo_usuario == 2).ToListAsync();
            return Ok(empleados);
        }
    }
}
