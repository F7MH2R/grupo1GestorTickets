namespace grupo1GestorTickets.Server.Models
{
    public class Estado
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}
