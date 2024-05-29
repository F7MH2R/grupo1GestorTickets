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
        public int tipo_usuario { get; set; }
        public int? Telefono { get; set; }
        public int? Cargo { get; set; }
        public int? estado_cuenta { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }

}

