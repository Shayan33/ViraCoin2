using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class accICO : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MiddleName",
                table: "Accounts");

            migrationBuilder.AddColumn<bool>(
                name: "GotICOCoin",
                table: "Accounts",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "IcoTxs",
                table: "Accounts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GotICOCoin",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "IcoTxs",
                table: "Accounts");

            migrationBuilder.AddColumn<string>(
                name: "MiddleName",
                table: "Accounts",
                maxLength: 20,
                nullable: true);
        }
    }
}
