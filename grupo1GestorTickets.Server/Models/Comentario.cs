using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Comentario
    {

        [Column("id")]
        public int Id { get; set; }

        [Column("comentario")]
        public string Texto { get; set; }
        [Column("id_ticket")]

        public int? IdTicket { get; set; }

        public Ticket Ticket { get; set; }
    }
}
