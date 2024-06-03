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
            modelBuilder.Entity<Usuario>().Property(u => u.EstadoCuenta).HasColumnName("estado_cuenta");
            modelBuilder.Entity<Usuario>().Property(u => u.FechaCreacion).HasColumnName("fecha_creacion");


        
        }
    }

}

