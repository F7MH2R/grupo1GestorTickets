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

        [HttpPost("crear-usuario")]
        public async Task<IActionResult> CrearUsuario([FromBody] Usuario nuevoUsuario)
        {
            if (nuevoUsuario == null || string.IsNullOrEmpty(nuevoUsuario.Nombre) || string.IsNullOrEmpty(nuevoUsuario.Correo) || string.IsNullOrEmpty(nuevoUsuario.Password))
            {
                return BadRequest("Nombre, correo y contraseña son requeridos.");
            }

            // Asignar la fecha de creación si es null
            nuevoUsuario.FechaCreacion = DateTime.Now;

            // Validación adicional para estado_cuenta
            if (nuevoUsuario.estado_cuenta == null)
            {
                nuevoUsuario.estado_cuenta = 1; // Por defecto Activo
            }

            _context.Usuario.Add(nuevoUsuario);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al crear usuario: " + ex.Message });
            }

            return Ok(new { message = "Usuario creado exitosamente" });
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
                estado_cuenta = user.estado_cuenta,
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

