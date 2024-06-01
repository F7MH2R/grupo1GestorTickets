using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models;

[Table("Bitacora")]
public partial class Bitacora
{
    [Key]
    public int Id { get; set; }

    [Column("fecha")]
    public DateOnly? Fecha { get; set; }

    [Column("descripcion", TypeName = "text")]
    public string Descripcion { get; set; } = null!;

    [Column("id_ticket")]
    public int? IdTicket { get; set; }

}
