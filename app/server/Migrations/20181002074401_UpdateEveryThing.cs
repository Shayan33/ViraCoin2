using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class UpdateEveryThing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Accounts_OWnerID",
                table: "Assets");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Accounts_SenderID",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "ShopTokens");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_SenderID",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Assets_OWnerID",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "Confirmed",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Function",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "LogData",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Recipient",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SenderID",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "AttorneyOwner",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "CurrentOwner",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "FirstOwner",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "ForSale",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "Issuer",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "OWnerID",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "PrevOwner",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "Registration",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "Fa",
                table: "Accounts");

            migrationBuilder.AddColumn<string>(
                name: "RecipientPubKey",
                table: "Transactions",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SenderPubKey",
                table: "Transactions",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "No",
                table: "Assets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Accounts",
                maxLength: 399,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IDPic",
                table: "Accounts",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonalID",
                table: "Accounts",
                maxLength: 20,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecipientPubKey",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SenderPubKey",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "No",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "IDPic",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "PersonalID",
                table: "Accounts");

            migrationBuilder.AddColumn<bool>(
                name: "Confirmed",
                table: "Transactions",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Function",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LogData",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Recipient",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SenderID",
                table: "Transactions",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "AttorneyOwner",
                table: "Assets",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrentOwner",
                table: "Assets",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstOwner",
                table: "Assets",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ForSale",
                table: "Assets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Issuer",
                table: "Assets",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OWnerID",
                table: "Assets",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "PrevOwner",
                table: "Assets",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registration",
                table: "Assets",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Accounts",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 399,
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Fa",
                table: "Accounts",
                nullable: false,
                defaultValue: false);

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

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SenderID",
                table: "Transactions",
                column: "SenderID");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_OWnerID",
                table: "Assets",
                column: "OWnerID");

            migrationBuilder.CreateIndex(
                name: "IX_ShopTokens_AssetID",
                table: "ShopTokens",
                column: "AssetID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Accounts_OWnerID",
                table: "Assets",
                column: "OWnerID",
                principalTable: "Accounts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Accounts_SenderID",
                table: "Transactions",
                column: "SenderID",
                principalTable: "Accounts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
