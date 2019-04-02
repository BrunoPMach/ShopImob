using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ShopImobBackEnd.Models
{
    public class VendaContext : DbContext
    {
        public VendaContext() : base("name=VendaContext") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Venda> Venda { get; set; }
        public DbSet<Vendedor> Vendedor { get; set; }
        public DbSet<Produto> Produto { get; set; }

    }
}