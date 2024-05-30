using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Bitacora
    {

        [Column("id")]
        public int Id { get; set; }

        [Column("fecha")]
        public DateTime? Fecha { get; set; }

        [Column("descripcion")]
        public string Descripcion { get; set; }

        [Column("id_ticket")]
        public int? IdTicket { get; set; }

        public Ticket Ticket { get; set; }
    }
}
