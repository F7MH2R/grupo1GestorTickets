using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string nombre { get; set; }
        
        public DateTime fecha_creacion { get; set; }
        public string descripcion { get; set; }
        public DateTime? fecha_actualizacion { get; set; }
        public int? id_estado { get; set; }
        public int? id_area { get; set; }
        public int? id_comentario { get; set; }
        public string id_usuario { get; set; }
        public int? IdUsuario { get; set; }

        // Navigation properties
        public Estado Estado { get; set; }
        public Area Area { get; set; }
        public Usuario Usuario { get; set; }
        public ICollection<Comentario> Comentarios { get; set; }
        public ICollection<Archivo> Archivos { get; set; }
        public ICollection<Bitacora> Bitacoras { get; set; }
    }

}





