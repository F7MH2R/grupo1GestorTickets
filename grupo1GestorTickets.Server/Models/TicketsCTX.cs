using System;
using System.Collections.Generic;
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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=TIMEMHA;Database=system_ticket;User Id= sa;Password=devslayer;Encrypt=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Archivo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__archivo__3213E83F0D813DAB");

            entity.HasOne(d => d.IdTicketNavigation).WithMany(p => p.Archivos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_ticket_archivo");
        });

        modelBuilder.Entity<Area>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__area__3213E83F6E368C6C");
        });

        modelBuilder.Entity<Bitacora>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Bitacora__3214EC0717FCEB5B");

            entity.HasOne(d => d.IdTicketNavigation).WithMany(p => p.Bitacoras).HasConstraintName("fk_ticket_bitacora");
        });

        modelBuilder.Entity<Comentario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__comentar__3213E83F2B5B7C8A");

            entity.HasOne(d => d.IdTicketNavigation).WithMany(p => p.Comentarios).HasConstraintName("comentario_Ticket_FK");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__estado__3213E83FC2BE1DE1");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Ticket__3213E83FAA09D013");

            entity.HasOne(d => d.IdAreaNavigation).WithMany(p => p.Tickets).HasConstraintName("FK__Ticket__id_area__44FF419A");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Tickets).HasConstraintName("FK__Ticket__id_estad__45F365D3");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.TicketIdUsuarioNavigations).HasConstraintName("FK__Ticket__id_usuar__46E78A0C");

            entity.HasOne(d => d.IdUsuarioAsignadoNavigation).WithMany(p => p.TicketIdUsuarioAsignadoNavigations)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("Ticket_usuario_FK");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__usuario__3213E83FE59898A4");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
