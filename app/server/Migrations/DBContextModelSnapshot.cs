﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
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
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065");

            modelBuilder.Entity("server.Models.Account", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("CellNumber")
                        .HasMaxLength(30);

                    b.Property<string>("EmailAddress")
                        .HasMaxLength(100)
                        .IsUnicode(true);

                    b.Property<bool>("Fa");

                    b.Property<string>("LastName")
                        .HasMaxLength(20);

                    b.Property<string>("MiddleName")
                        .HasMaxLength(20);

                    b.Property<string>("Name")
                        .HasMaxLength(20);

                    b.Property<string>("OfficeNumber")
                        .HasMaxLength(30);

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(30)
                        .IsUnicode(true);

                    b.Property<string>("PubKey")
                        .HasMaxLength(50);

                    b.HasKey("ID");

                    b.HasIndex("PubKey")
                        .IsUnique();

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("server.Models.Asset", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("AttorneyOwner")
                        .HasMaxLength(32);

                    b.Property<bool>("Available");

                    b.Property<byte[]>("CompleteData");

                    b.Property<byte[]>("CurrentOwner")
                        .HasMaxLength(32);

                    b.Property<byte[]>("Data")
                        .HasMaxLength(40)
                        .IsUnicode(true);

                    b.Property<byte[]>("FirstOwner")
                        .HasMaxLength(32);

                    b.Property<bool>("ForSale");

                    b.Property<string>("ImgPath1")
                        .HasMaxLength(45);

                    b.Property<string>("ImgPath2")
                        .HasMaxLength(45);

                    b.Property<string>("ImgPath3")
                        .HasMaxLength(45);

                    b.Property<string>("ImgPath4")
                        .HasMaxLength(45);

                    b.Property<string>("ImgPath5")
                        .HasMaxLength(45);

                    b.Property<string>("ImgPath6")
                        .HasMaxLength(45);

                    b.Property<string>("ImgPath7")
                        .HasMaxLength(45);

                    b.Property<string>("ImgPath8")
                        .HasMaxLength(45);

                    b.Property<byte[]>("Issuer")
                        .HasMaxLength(32);

                    b.Property<string>("MetaDate");

                    b.Property<Guid>("OWnerID");

                    b.Property<byte[]>("PrevOwner")
                        .HasMaxLength(32);

                    b.Property<DateTime>("Production");

                    b.Property<DateTime>("Registration");

                    b.Property<byte[]>("Token")
                        .HasMaxLength(40);

                    b.HasKey("ID");

                    b.HasIndex("OWnerID");

                    b.HasIndex("Token")
                        .IsUnique();

                    b.ToTable("Assets");
                });

            modelBuilder.Entity("server.Models.ShopTokens", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AssetID");

                    b.Property<bool>("Img1");

                    b.Property<bool>("Img2");

                    b.Property<bool>("Img3");

                    b.Property<bool>("Img4");

                    b.Property<bool>("Img5");

                    b.Property<bool>("Img6");

                    b.Property<bool>("Img7");

                    b.Property<bool>("Img8");

                    b.Property<double>("Price");

                    b.HasKey("ID");

                    b.HasIndex("AssetID")
                        .IsUnique();

                    b.ToTable("ShopTokens");
                });

            modelBuilder.Entity("server.Models.Asset", b =>
                {
                    b.HasOne("server.Models.Account", "Owner")
                        .WithMany("Assets")
                        .HasForeignKey("OWnerID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("server.Models.ShopTokens", b =>
                {
                    b.HasOne("server.Models.Asset", "Asset")
                        .WithOne("InShop")
                        .HasForeignKey("server.Models.ShopTokens", "AssetID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
