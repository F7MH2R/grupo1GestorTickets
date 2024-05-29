using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Ticket
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("nombre")]
        public string Nombre { get; set; }
        [Column ("fecha_creacion")]
        public DateTime FechaCreacion { get; set; }
        [Column("descripcion")]
        public string Descripcion { get; set; }
        [Column("fecha_actualizacion")]
        public DateTime? FechaActualizacion { get; set; }
        [Column("id_estado")]
        public int? IdEstado { get; set; }
        [Column("id_area")]

        public int? IdArea { get; set; }
        [Column("id_usuario_asignado")]

        public int? IdUsuarioAsignado { get; set; }
        [Column("prioridad")]

        public string Prioridad { get; set; }
        [Column("id_usuario")]

        public int? IdUsuario { get; set; }
        public Estado Estado { get; set; }
        public Area Area { get; set; }
        public Usuario Usuario { get; set; }
        public ICollection<Comentario> Comentarios { get; set; }
        public ICollection<Archivo> Archivos { get; set; }
        public ICollection<Bitacora> Bitacoras { get; set; }
    }
}
