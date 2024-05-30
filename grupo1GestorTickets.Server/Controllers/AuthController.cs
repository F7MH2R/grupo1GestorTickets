using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using grupo1GestorTickets.Server.Models;

namespace grupo1GestorTickets.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (model == null || string.IsNullOrEmpty(model.Correo) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Correo y contraseña son requeridos.");
            }

            var user = await _context.Usuario
                .FirstOrDefaultAsync(u => u.Correo == model.Correo && u.Password == model.Password);

            if (user == null)
            {
                return Unauthorized("Usuario no existe.");
            }

            return Ok(new
            {
                Id = user.Id,
                Nombre = user.Nombre,
                Correo = user.Correo,
                tipo_usuario = user.tipo_usuario,
                Telefono = user.Telefono,
                Cargo = user.Cargo,
                estado_cuenta = user.EstadoCuenta,
                FechaCreacion = user.FechaCreacion
            });
        }

    }

    public class LoginModel
    {
        public string Correo { get; set; }
        public string Password { get; set; }
    }
}
