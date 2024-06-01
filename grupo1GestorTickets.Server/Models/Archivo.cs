using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Models;

[Table("archivo")]
public partial class Archivo
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("nombre")]
    [StringLength(255)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [Column("contenido")]
    [Unicode(false)]
    public string Contenido { get; set; } = null!;

    [Column("tipo")]
    [StringLength(10)]
    [Unicode(false)]
    public string? Tipo { get; set; }

    [Column("id_ticket")]
    public int IdTicket { get; set; }

}
