using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Archivo
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Contenido { get; set; }
        public string Tipo { get; set; }
        public int id_ticket { get; set; }

        // Navigation property
        public Ticket Ticket { get; set; }
    }


}


