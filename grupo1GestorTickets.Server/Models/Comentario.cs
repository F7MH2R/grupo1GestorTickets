using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Comentario
    {
        public int Id { get; set; }
        public string comentario { get; set; }
        public int id_ticket { get; set; }

        // Navigation property
        public Ticket Ticket { get; set; }
    }



}


