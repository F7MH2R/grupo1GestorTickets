using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Models;

[Table("estado")]
public partial class Estado
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("estado")]
    [StringLength(255)]
    [Unicode(false)]
    public string Estado1 { get; set; } = null!;
}
