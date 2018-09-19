using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<ShopTokens> ShopTokens { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>(e =>
            {
                e.HasIndex(p => p.PubKey).IsUnique();
                e.Property(p => p.EmailAddress).IsUnicode();
                e.Property(p => p.PhoneNumber).IsUnicode();
            });

            modelBuilder.Entity<Asset>(e =>
            {
                e.HasIndex(p => p.Token).IsUnique();
                e.Property(p => p.Data).IsUnicode();
            });

            modelBuilder.Entity<Asset>(e =>
           {
               e.HasIndex(p => new { p.I1, p.I2, p.I3, p.I4 }).IsUnique();

           });
        }
    }
}
