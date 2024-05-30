using System;
using System.Collections.Generic;
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
    public int IdUsuarioAsignado { get; set; }

    [InverseProperty("IdTicketNavigation")]
    public virtual ICollection<Archivo> Archivos { get; set; } = new List<Archivo>();

    [InverseProperty("IdTicketNavigation")]
    public virtual ICollection<Bitacora> Bitacoras { get; set; } = new List<Bitacora>();

    [InverseProperty("IdTicketNavigation")]
    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    [ForeignKey("IdArea")]
    [InverseProperty("Tickets")]
    public virtual Area? IdAreaNavigation { get; set; }

    [ForeignKey("IdEstado")]
    [InverseProperty("Tickets")]
    public virtual Estado? IdEstadoNavigation { get; set; }

    [ForeignKey("IdUsuarioAsignado")]
    [InverseProperty("TicketIdUsuarioAsignadoNavigations")]
    public virtual Usuario? IdUsuarioAsignadoNavigation { get; set; }

    [ForeignKey("IdUsuario")]
    [InverseProperty("TicketIdUsuarioNavigations")]
    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
