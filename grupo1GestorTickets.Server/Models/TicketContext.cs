using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Models
{
    public class TicketContext:DbContext
    {
        public TicketContext(DbContextOptions<TicketContext> options) : base(options)
        {
        }}}

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Estado> Estados { get; set; }
        public DbSet<Comentario> Comentarios { get; set; }
        public DbSet<Bitacora> Bitacoras { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Archivo> Archivos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de relaciones y claves foráneas
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Estado)
                .WithMany(e => e.Tickets)
                .HasForeignKey(t => t.IdEstado);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Area)
                .WithMany(a => a.Tickets)
                .HasForeignKey(t => t.IdArea);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Usuario)
                .WithMany(u => u.Tickets)
                .HasForeignKey(t => t.IdUsuario);

            modelBuilder.Entity<Comentario>()
                .HasOne(c => c.Ticket)
                .WithMany(t => t.Comentarios)
                .HasForeignKey(c => c.IdTicket);

            modelBuilder.Entity<Archivo>()
                .HasOne(a => a.Ticket)
                .WithMany(t => t.Archivos)
                .HasForeignKey(a => a.IdTicket);

            modelBuilder.Entity<Bitacora>()
                .HasOne(b => b.Ticket)
                .WithMany(t => t.Bitacoras)
                .HasForeignKey(b => b.IdTicket);
        }
}
