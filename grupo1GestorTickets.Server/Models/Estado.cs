using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Estado
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("estado")]

        public string Nombre { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}
