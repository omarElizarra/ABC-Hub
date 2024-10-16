using AVB_Hub.Models;
using Microsoft.EntityFrameworkCore;


namespace AVB_Hub.Data
{
    public class AppDbContexto : DbContext
    {
        public AppDbContexto(DbContextOptions<AppDbContexto> options) : base(options) { }
            public DbSet<Usuario> Usuarios { get; set; }
            public DbSet<Pedido> Pedidos { get; set; }
            public DbSet<Producto> Productos { get; set; }

            public DbSet<DetallePedido> DetallesPedido { get; set; }
            public DbSet<RegistroExistencias> RegistroExistencias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>()
                .HasKey(u => u.IdUsuario);

            modelBuilder.Entity<Pedido>()
                .HasKey(p => p.ID_Pedido);

            modelBuilder.Entity<Pedido>()
                .HasOne<Usuario>()
                .WithMany()
                .HasForeignKey(p => p.ID_Vendedor)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DetallePedido>()
            .HasKey(dp => dp.ID_Detalle);

            modelBuilder.Entity<Producto>()
            .HasKey(p => p.ID_Producto);

            modelBuilder.Entity<RegistroExistencias>().HasKey(re => re.ID_Registro);


            base.OnModelCreating(modelBuilder);
        }
    }

    
}
