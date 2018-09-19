using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    PubKey = table.Column<string>(maxLength: 50, nullable: true),
                    Name = table.Column<string>(maxLength: 20, nullable: true),
                    MiddleName = table.Column<string>(maxLength: 20, nullable: true),
                    LastName = table.Column<string>(maxLength: 20, nullable: true),
                    EmailAddress = table.Column<string>(maxLength: 100, nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 30, nullable: true),
                    CellNumber = table.Column<string>(maxLength: 30, nullable: true),
                    OfficeNumber = table.Column<string>(maxLength: 30, nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Fa = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    Token = table.Column<string>(maxLength: 100, nullable: true),
                    Data = table.Column<string>(maxLength: 100, nullable: true),
                    I1 = table.Column<ulong>(nullable: false),
                    I2 = table.Column<ulong>(nullable: false),
                    I3 = table.Column<ulong>(nullable: false),
                    I4 = table.Column<ulong>(nullable: false),
                    Production = table.Column<DateTime>(nullable: false),
                    Registration = table.Column<DateTime>(nullable: false),
                    CurrentOwner = table.Column<string>(maxLength: 100, nullable: true),
                    PrevOwner = table.Column<string>(maxLength: 100, nullable: true),
                    FirstOwner = table.Column<string>(maxLength: 100, nullable: true),
                    Issuer = table.Column<string>(maxLength: 100, nullable: true),
                    AttorneyOwner = table.Column<string>(maxLength: 100, nullable: true),
                    Available = table.Column<bool>(nullable: false),
                    ForSale = table.Column<bool>(nullable: false),
                    OWnerID = table.Column<Guid>(nullable: false),
                    ImgPath = table.Column<string>(nullable: true),
                    MetaDate = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Assets_Accounts_OWnerID",
                        column: x => x.OWnerID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShopTokens",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    AssetID = table.Column<Guid>(nullable: false),
                    Price = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopTokens", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ShopTokens_Assets_AssetID",
                        column: x => x.AssetID,
                        principalTable: "Assets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    SenderID = table.Column<Guid>(nullable: false),
                    Recipient = table.Column<Guid>(nullable: true),
                    CoinBaseRelatedCoinID = table.Column<Guid>(nullable: true),
                    TxHash = table.Column<string>(maxLength: 100, nullable: true),
                    Confirmed = table.Column<bool>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    LogData = table.Column<string>(nullable: true),
                    Function = table.Column<string>(nullable: true)
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
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_SenderID",
                        column: x => x.SenderID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_PubKey",
                table: "Accounts",
                column: "PubKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Assets_OWnerID",
                table: "Assets",
                column: "OWnerID");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_Token",
                table: "Assets",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShopTokens_AssetID",
                table: "ShopTokens",
                column: "AssetID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CoinBaseRelatedCoinID",
                table: "Transactions",
                column: "CoinBaseRelatedCoinID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SenderID",
                table: "Transactions",
                column: "SenderID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShopTokens");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropTable(
                name: "Accounts");
        }
    }
}
