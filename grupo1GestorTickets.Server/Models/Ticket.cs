namespace grupo1GestorTickets.Server.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Descripcion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public int? IdEstado { get; set; }
        public int? IdArea { get; set; }
        public int? IdComentario { get; set; }
        public string Prioridad { get; set; }
        public int? IdUsuario { get; set; }

        public Estado Estado { get; set; }
        public Area Area { get; set; }
        public Usuario Usuario { get; set; }
        public ICollection<Comentario> Comentarios { get; set; }
        public ICollection<Archivo> Archivos { get; set; }
        public ICollection<Bitacora> Bitacoras { get; set; }
    }
}
