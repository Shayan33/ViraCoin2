using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class accICO2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IcoTxs",
                table: "Accounts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IcoTxs",
                table: "Accounts",
                nullable: true);
        }
    }
}
