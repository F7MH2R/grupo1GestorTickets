using System.Net.Sockets;

namespace grupo1GestorTickets.Server.Models
{
    public class Comentario
    {
        public int Id { get; set; }
        public string Texto { get; set; }
        public int? IdTicket { get; set; }

        public Ticket Ticket { get; set; }
    }
}