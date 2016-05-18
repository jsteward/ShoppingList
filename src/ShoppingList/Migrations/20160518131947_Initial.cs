using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace ShoppingList.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Item_ShoppingList_ShoppingListId", table: "Item");
            migrationBuilder.DropColumn(name: "ShoppingListId", table: "Item");
            migrationBuilder.DropTable("ShoppingList");
            migrationBuilder.CreateTable(
                name: "ItemList",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ListName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemList", x => x.Id);
                });
            migrationBuilder.AddColumn<int>(
                name: "ItemListId",
                table: "Item",
                nullable: true);
            migrationBuilder.AddForeignKey(
                name: "FK_Item_ItemList_ItemListId",
                table: "Item",
                column: "ItemListId",
                principalTable: "ItemList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Item_ItemList_ItemListId", table: "Item");
            migrationBuilder.DropColumn(name: "ItemListId", table: "Item");
            migrationBuilder.DropTable("ItemList");
            migrationBuilder.CreateTable(
                name: "ShoppingList",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ListName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingList", x => x.Id);
                });
            migrationBuilder.AddColumn<int>(
                name: "ShoppingListId",
                table: "Item",
                nullable: true);
            migrationBuilder.AddForeignKey(
                name: "FK_Item_ShoppingList_ShoppingListId",
                table: "Item",
                column: "ShoppingListId",
                principalTable: "ShoppingList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
