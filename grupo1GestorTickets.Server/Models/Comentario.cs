using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace grupo1GestorTickets.Server.Models;

[Table("comentario")]
public partial class Comentario
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("comentario", TypeName = "text")]
    public string Comentario1 { get; set; } = null!;

    [Column("id_ticket")]
    public int IdTicket { get; set; }

    public int idUsuario { get; set; }

    public DateTime fechaCreacion { get; set; }

}
