using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Models;

[Table("usuario")]
public partial class Usuario
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("nombre")]
    [StringLength(255)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [Column("correo")]
    [StringLength(255)]
    [Unicode(false)]
    public string Correo { get; set; } = null!;

    [Column("password")]
    [StringLength(100)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [Column("tipo_usuario")]
    public int tipo_usuario { get; set; }
    [Column("telefono")]
    public int? Telefono { get; set; }

    [Column("cargo")]
    public int? Cargo { get; set; }

    [Column("estado_cuenta")]
    public int? estado_cuenta { get; set; }

    [Column("fecha_creacion", TypeName = "datetime")]
    public DateTime? FechaCreacion { get; set; }

    public string? nombreEmpresa { get; set; }

}
