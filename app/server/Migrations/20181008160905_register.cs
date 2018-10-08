using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class register : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Registered",
                table: "Accounts",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Registered",
                table: "Accounts");
        }
    }
}
