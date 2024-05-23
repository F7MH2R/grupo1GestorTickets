using System;
using System.ComponentModel.DataAnnotations;


namespace grupo1GestorTickets.Server.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
        public int? TipoUsuario { get; set; }
        public int? Telefono { get; set; }
        public int? Cargo { get; set; }
        public int? EstadoCuenta { get; set; }
        public DateTime? FechaCreacion { get; set; }
    }
}
