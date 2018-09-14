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
                    Token = table.Column<byte[]>(maxLength: 40, nullable: true),
                    Data = table.Column<byte[]>(maxLength: 40, nullable: true),
                    Production = table.Column<DateTime>(nullable: false),
                    Registration = table.Column<DateTime>(nullable: false),
                    CurrentOwner = table.Column<byte[]>(maxLength: 32, nullable: true),
                    PrevOwner = table.Column<byte[]>(maxLength: 32, nullable: true),
                    FirstOwner = table.Column<byte[]>(maxLength: 32, nullable: true),
                    Issuer = table.Column<byte[]>(maxLength: 32, nullable: true),
                    AttorneyOwner = table.Column<byte[]>(maxLength: 32, nullable: true),
                    Available = table.Column<bool>(nullable: false),
                    ForSale = table.Column<bool>(nullable: false),
                    OWnerID = table.Column<Guid>(nullable: false),
                    ImgPath1 = table.Column<string>(maxLength: 45, nullable: true),
                    ImgPath2 = table.Column<string>(maxLength: 45, nullable: true),
                    ImgPath3 = table.Column<string>(maxLength: 45, nullable: true),
                    ImgPath4 = table.Column<string>(maxLength: 45, nullable: true),
                    ImgPath5 = table.Column<string>(maxLength: 45, nullable: true),
                    ImgPath6 = table.Column<string>(maxLength: 45, nullable: true),
                    ImgPath7 = table.Column<string>(maxLength: 45, nullable: true),
                    ImgPath8 = table.Column<string>(maxLength: 45, nullable: true),
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
                    Price = table.Column<double>(nullable: false),
                    Img1 = table.Column<bool>(nullable: false),
                    Img2 = table.Column<bool>(nullable: false),
                    Img3 = table.Column<bool>(nullable: false),
                    Img4 = table.Column<bool>(nullable: false),
                    Img5 = table.Column<bool>(nullable: false),
                    Img6 = table.Column<bool>(nullable: false),
                    Img7 = table.Column<bool>(nullable: false),
                    Img8 = table.Column<bool>(nullable: false)
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShopTokens");

            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropTable(
                name: "Accounts");
        }
    }
}
