namespace grupo1GestorTickets.Server.DTO
{
    public class TicketDTO
    {
        public string titulo { get; set; }
        public string descripcion { get; set; }
        public int idArea { get; set; }
        public int idEstado { get; set; }
        public string prioridad {  get; set; }
        public int idUsuario { get; set; }
    }
}
