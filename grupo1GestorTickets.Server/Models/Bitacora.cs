using System.Net.Sockets;

namespace grupo1GestorTickets.Server.Models
{
    public class Bitacora
    {
        public int Id { get; set; }
        public DateTime? Fecha { get; set; }
        public string Descripcion { get; set; }
        public int? IdTicket { get; set; }

        public Ticket Ticket { get; set; }
    }
}