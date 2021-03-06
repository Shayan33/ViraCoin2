USE [Vira]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 9/25/2018 6:50:58 AM ******/
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
/****** Object:  Table [dbo].[Accounts]    Script Date: 9/25/2018 6:50:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Accounts](
	[ID] [uniqueidentifier] NOT NULL,
	[PubKey] [nvarchar](50) NULL,
	[Name] [nvarchar](20) NULL,
	[MiddleName] [nvarchar](20) NULL,
	[LastName] [nvarchar](20) NULL,
	[EmailAddress] [nvarchar](100) NULL,
	[PhoneNumber] [nvarchar](30) NULL,
	[CellNumber] [nvarchar](30) NULL,
	[OfficeNumber] [nvarchar](30) NULL,
	[Address] [nvarchar](max) NULL,
	[Fa] [bit] NOT NULL,
 CONSTRAINT [PK_Accounts] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Assets]    Script Date: 9/25/2018 6:50:58 AM ******/
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
	[Registration] [datetime2](7) NOT NULL,
	[CurrentOwner] [nvarchar](100) NULL,
	[PrevOwner] [nvarchar](100) NULL,
	[FirstOwner] [nvarchar](100) NULL,
	[Issuer] [nvarchar](100) NULL,
	[AttorneyOwner] [nvarchar](100) NULL,
	[Available] [bit] NOT NULL,
	[ForSale] [bit] NOT NULL,
	[OWnerID] [uniqueidentifier] NOT NULL,
	[ImgPath] [nvarchar](max) NULL,
	[MetaDate] [nvarchar](max) NULL,
 CONSTRAINT [PK_Assets] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShopTokens]    Script Date: 9/25/2018 6:50:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShopTokens](
	[ID] [uniqueidentifier] NOT NULL,
	[AssetID] [uniqueidentifier] NOT NULL,
	[Price] [float] NOT NULL,
 CONSTRAINT [PK_ShopTokens] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 9/25/2018 6:50:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[ID] [uniqueidentifier] NOT NULL,
	[SenderID] [uniqueidentifier] NOT NULL,
	[Recipient] [nvarchar](max) NULL,
	[CoinBaseRelatedCoinID] [uniqueidentifier] NULL,
	[TxHash] [nvarchar](100) NULL,
	[Confirmed] [bit] NOT NULL,
	[Type] [int] NOT NULL,
	[LogData] [nvarchar](max) NULL,
	[Function] [nvarchar](max) NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Assets]  WITH CHECK ADD  CONSTRAINT [FK_Assets_Accounts_OWnerID] FOREIGN KEY([OWnerID])
REFERENCES [dbo].[Accounts] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Assets] CHECK CONSTRAINT [FK_Assets_Accounts_OWnerID]
GO
ALTER TABLE [dbo].[ShopTokens]  WITH CHECK ADD  CONSTRAINT [FK_ShopTokens_Assets_AssetID] FOREIGN KEY([AssetID])
REFERENCES [dbo].[Assets] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ShopTokens] CHECK CONSTRAINT [FK_ShopTokens_Assets_AssetID]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Accounts_SenderID] FOREIGN KEY([SenderID])
REFERENCES [dbo].[Accounts] ([ID])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Accounts_SenderID]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Assets_CoinBaseRelatedCoinID] FOREIGN KEY([CoinBaseRelatedCoinID])
REFERENCES [dbo].[Assets] ([ID])
ON DELETE SET DEFAULT
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Assets_CoinBaseRelatedCoinID]
GO
