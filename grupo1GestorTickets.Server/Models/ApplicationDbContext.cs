using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuario { get; set; }
    
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<Estado> Estado { get; set; }
        public DbSet<Comentario> Comentario { get; set; }
        public DbSet<Bitacora> Bitacora { get; set; }
        public DbSet<Area> Area { get; set; }
        public DbSet<Archivo> Archivo { get; set; }

      
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapear propiedades a columnas
            modelBuilder.Entity<Usuario>().Property(u => u.tipo_usuario).HasColumnName("tipo_usuario");
            modelBuilder.Entity<Usuario>().Property(u => u.estado_cuenta).HasColumnName("estado_cuenta");
            modelBuilder.Entity<Usuario>().Property(u => u.FechaCreacion).HasColumnName("fecha_creacion");


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

}

