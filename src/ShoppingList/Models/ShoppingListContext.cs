using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;

namespace ShoppingList.Models
{
    public class GroceryListContext : DbContext
    {
        private static bool _created = false;

        public GroceryListContext()
        {
            if (!_created)
            {
                _created = true;
                Database.EnsureCreated();
            }
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
        }

        public DbSet<Item> Items { get; set; }

        public DbSet<ItemList> ItemLists { get; set; }
         
    }
}
