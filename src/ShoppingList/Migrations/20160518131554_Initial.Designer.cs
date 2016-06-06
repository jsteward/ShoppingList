using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using ShoppingList.Models;

namespace ShoppingList.Migrations
{
    [DbContext(typeof(ShoppingListContext))]
    [Migration("20160518131554_Initial")]
    partial class Initial1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ShoppingList.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("Notes");

                    b.Property<int>("Quantity");

                    b.Property<int?>("ShoppingListId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ShoppingList.Models.ShoppingList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ListName");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ShoppingList.Models.Item", b =>
                {
                    b.HasOne("ShoppingList.Models.ShoppingList")
                        .WithMany()
                        .HasForeignKey("ShoppingListId");
                });
        }
    }
}
