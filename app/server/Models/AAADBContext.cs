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

        }
    }
}
