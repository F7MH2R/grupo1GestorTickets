using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Archivo
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("nombre")]
        public string Nombre { get; set; }

        [Column("contenido")]
        public string Contenido { get; set; }

        [Column("tipo")]
        public string Tipo { get; set; }

        [Column("id_ticket")]
        public int? IdTicket { get; set; }

        public Ticket Ticket { get; set; }
    }
}
