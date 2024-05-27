using System.Net.Sockets;

namespace grupo1GestorTickets.Server.Models
{
    public class Archivo
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Contenido { get; set; }
        public string Tipo { get; set; }
        public int? IdTicket { get; set; }

        public Ticket Ticket { get; set; }
    }
}