using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using ShoppingList.Models;

namespace ShoppingList.Migrations
{
    [DbContext(typeof(GroceryListContext))]
    partial class GroceryListContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ShoppingList.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ItemListId");

                    b.Property<string>("Name");

                    b.Property<string>("Notes");

                    b.Property<int>("Quantity");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ShoppingList.Models.ItemList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ListName");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ShoppingList.Models.Item", b =>
                {
                    b.HasOne("ShoppingList.Models.ItemList")
                        .WithMany()
                        .HasForeignKey("ItemListId");
                });
        }
    }
}
