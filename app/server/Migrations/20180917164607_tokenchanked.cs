using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class tokenchanked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "I1",
                table: "Assets",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "I2",
                table: "Assets",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "I3",
                table: "Assets",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "I4",
                table: "Assets",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Assets_I1_I2_I3_I4",
                table: "Assets",
                columns: new[] { "I1", "I2", "I3", "I4" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Assets_I1_I2_I3_I4",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "I1",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "I2",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "I3",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "I4",
                table: "Assets");
        }
    }
}
