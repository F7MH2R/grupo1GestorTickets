using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }

        [Column("tipo_usuario")]
        public int TipoUsuario { get; set; }

        public int? Telefono { get; set; }
        public int? Cargo { get; set; }

        [Column("estado_cuenta")]
        public int? EstadoCuenta { get; set; }

        [Column("fecha_creacion")]
        public DateTime? FechaCreacion { get; set; }
    }
}

