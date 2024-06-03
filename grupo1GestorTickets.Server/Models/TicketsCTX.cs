using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Models;

public partial class TicketsCTX : DbContext
{
    public TicketsCTX()
    {
    }

    public TicketsCTX(DbContextOptions<TicketsCTX> options)
        : base(options)
    {
    }

    public virtual DbSet<Archivo> Archivos { get; set; }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<Bitacora> Bitacoras { get; set; }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<Estado> Estados { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

}
