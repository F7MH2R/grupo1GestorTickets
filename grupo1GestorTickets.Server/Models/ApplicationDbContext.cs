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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapear propiedades a columnas
            modelBuilder.Entity<Usuario>().Property(u => u.tipo_usuario).HasColumnName("tipo_usuario");
            modelBuilder.Entity<Usuario>().Property(u => u.estado_cuenta).HasColumnName("estado_cuenta");
            modelBuilder.Entity<Usuario>().Property(u => u.FechaCreacion).HasColumnName("fecha_creacion");
        }
    }

}

