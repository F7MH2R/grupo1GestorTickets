using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Models;

[Table("Ticket")]
public partial class Ticket
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("nombre")]
    [StringLength(255)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [Column("fecha_creacion", TypeName = "datetime")]
    public DateTime FechaCreacion { get; set; }

    [Column("descripcion", TypeName = "text")]
    public string Descripcion { get; set; } = null!;

    [Column("fecha_actualizacion")]
    public DateOnly FechaActualizacion { get; set; }

    [Column("id_estado")]
    public int IdEstado { get; set; }

    [Column("id_area")]
    public int? IdArea { get; set; }

    [Column("prioridad")]
    [StringLength(100)]
    [Unicode(false)]
    public string? Prioridad { get; set; }

    [Column("id_usuario")]
    public int? IdUsuario { get; set; }

    [Column("id_usuario_asignado")]
    public int? IdUsuarioAsignado { get; set; }

}
