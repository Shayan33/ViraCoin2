using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class removeTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    CoinBaseRelatedCoinID = table.Column<Guid>(nullable: true),
                    RecipientPubKey = table.Column<string>(maxLength: 50, nullable: true),
                    SenderPubKey = table.Column<string>(maxLength: 50, nullable: true),
                    TxHash = table.Column<string>(maxLength: 100, nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Transactions_Assets_CoinBaseRelatedCoinID",
                        column: x => x.CoinBaseRelatedCoinID,
                        principalTable: "Assets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CoinBaseRelatedCoinID",
                table: "Transactions",
                column: "CoinBaseRelatedCoinID",
                unique: true,
                filter: "[CoinBaseRelatedCoinID] IS NOT NULL");
        }
    }
}
