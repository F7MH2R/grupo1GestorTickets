using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Area
    {

        [Column("id")]
        public int Id { get; set; }

        [Column("nombre")]
        public string Nombre { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}
