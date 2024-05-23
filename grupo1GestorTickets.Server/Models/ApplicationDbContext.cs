using Microsoft.EntityFrameworkCore;
using grupo1GestorTickets.Server.Models;

namespace grupo1GestorTickets.Server.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) 
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}
