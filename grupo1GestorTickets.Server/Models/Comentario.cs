using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

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

    [ForeignKey("IdTicket")]
    [InverseProperty("Comentarios")]
    public virtual Ticket IdTicketNavigation { get; set; } = null!;
}
