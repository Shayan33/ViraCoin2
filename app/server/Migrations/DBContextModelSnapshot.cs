﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Models;

namespace server.Migrations
{
    [DbContext(typeof(DBContext))]
    partial class DBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("server.Models.Account", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .HasMaxLength(399);

                    b.Property<string>("CellNumber")
                        .HasMaxLength(30);

                    b.Property<string>("EmailAddress")
                        .HasMaxLength(100)
                        .IsUnicode(true);

                    b.Property<string>("IDPic")
                        .HasMaxLength(10);

                    b.Property<string>("LastName")
                        .HasMaxLength(20);

                    b.Property<string>("MiddleName")
                        .HasMaxLength(20);

                    b.Property<string>("Name")
                        .HasMaxLength(20);

                    b.Property<string>("OfficeNumber")
                        .HasMaxLength(30);

                    b.Property<string>("PersonalID")
                        .HasMaxLength(20);

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(30)
                        .IsUnicode(true);

                    b.Property<string>("PubKey")
                        .HasMaxLength(50);

                    b.HasKey("ID");

                    b.HasIndex("PubKey")
                        .IsUnique()
                        .HasFilter("[PubKey] IS NOT NULL");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("server.Models.Asset", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Available");

                    b.Property<string>("Data")
                        .HasMaxLength(100)
                        .IsUnicode(true);

                    b.Property<decimal>("I1")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 20, scale: 0)));

                    b.Property<decimal>("I2")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 20, scale: 0)));

                    b.Property<decimal>("I3")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 20, scale: 0)));

                    b.Property<decimal>("I4")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 20, scale: 0)));

                    b.Property<string>("ImgPath");

                    b.Property<string>("MetaDate");

                    b.Property<int>("No");

                    b.Property<DateTime>("Production");

                    b.Property<string>("Token")
                        .HasMaxLength(100);

                    b.HasKey("ID");

                    b.HasIndex("Token")
                        .IsUnique()
                        .HasFilter("[Token] IS NOT NULL");

                    b.ToTable("Assets");
                });
#pragma warning restore 612, 618
        }
    }
}
