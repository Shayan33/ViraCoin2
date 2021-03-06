USE [Vira]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 10/5/2018 2:31:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Accounts]    Script Date: 10/5/2018 2:31:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Accounts](
	[ID] [uniqueidentifier] NOT NULL,
	[PubKey] [nvarchar](50) NULL,
	[Name] [nvarchar](20) NULL,
	[LastName] [nvarchar](20) NULL,
	[EmailAddress] [nvarchar](100) NULL,
	[PhoneNumber] [nvarchar](30) NULL,
	[CellNumber] [nvarchar](30) NULL,
	[OfficeNumber] [nvarchar](30) NULL,
	[Address] [nvarchar](399) NULL,
	[IDPic] [nvarchar](10) NULL,
	[PersonalID] [nvarchar](20) NULL,
	[GotICOCoin] [bit] NOT NULL,
 CONSTRAINT [PK_Accounts] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Assets]    Script Date: 10/5/2018 2:31:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Assets](
	[ID] [uniqueidentifier] NOT NULL,
	[Token] [nvarchar](100) NULL,
	[Data] [nvarchar](100) NULL,
	[I1] [decimal](20, 0) NOT NULL,
	[I2] [decimal](20, 0) NOT NULL,
	[I3] [decimal](20, 0) NOT NULL,
	[I4] [decimal](20, 0) NOT NULL,
	[Production] [datetime2](7) NOT NULL,
	[Available] [bit] NOT NULL,
	[ImgPath] [nvarchar](max) NULL,
	[MetaDate] [nvarchar](max) NULL,
	[No] [int] NOT NULL,
 CONSTRAINT [PK_Assets] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Accounts] ADD  DEFAULT ((0)) FOR [GotICOCoin]
GO
ALTER TABLE [dbo].[Assets] ADD  DEFAULT ((0)) FOR [No]
GO
