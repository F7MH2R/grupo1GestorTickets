using Microsoft.EntityFrameworkCore;

namespace grupo1GestorTickets.Server.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapear la tabla "usuario" a la entidad Usuario
            modelBuilder.Entity<Usuario>().ToTable("usuario");

            // Mapear propiedades a columnas
            modelBuilder.Entity<Usuario>().Property(u => u.TipoUsuario).HasColumnName("tipo_usuario");
            modelBuilder.Entity<Usuario>().Property(u => u.EstadoCuenta).HasColumnName("estado_cuenta");
            modelBuilder.Entity<Usuario>().Property(u => u.FechaCreacion).HasColumnName("fecha_creacion");
        }
    }
}

