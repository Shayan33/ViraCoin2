export const TokenABI=[
	{
		"constant": true,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			}
		],
		"name": "GetData",
		"outputs": [
			{
				"name": "tok",
				"type": "bytes32"
			},
			{
				"name": "Data",
				"type": "bytes32"
			},
			{
				"name": "Production",
				"type": "uint256"
			},
			{
				"name": "Registration",
				"type": "uint256"
			},
			{
				"name": "PrevOwner",
				"type": "address"
			},
			{
				"name": "InitalOwner",
				"type": "address"
			},
			{
				"name": "Issuer",
				"type": "address"
			},
			{
				"name": "AttorneyOwner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			},
			{
				"name": "to",
				"type": "address"
			}
		],
		"name": "AttorneyTransfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "initVector",
				"type": "bytes"
			},
			{
				"name": "tok",
				"type": "bytes32"
			},
			{
				"name": "production",
				"type": "uint256"
			}
		],
		"name": "IssueNewToken",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "initVector",
				"type": "bytes"
			},
			{
				"name": "tok",
				"type": "bytes32"
			},
			{
				"name": "production",
				"type": "uint256"
			},
			{
				"name": "owner",
				"type": "address"
			}
		],
		"name": "IssueNewToken",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "NewFee",
				"type": "uint256"
			}
		],
		"name": "UpdateFee",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			}
		],
		"name": "Burn",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			}
		],
		"name": "AttorneyGet",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "PassAuthority",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			},
			{
				"name": "Attorney",
				"type": "address"
			}
		],
		"name": "PassAttorney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetFunds",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			},
			{
				"name": "Attorney",
				"type": "address"
			}
		],
		"name": "SetAttorney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			}
		],
		"name": "ClearAttorney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "Fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			}
		],
		"name": "GetTokenOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			},
			{
				"name": "to",
				"type": "address"
			}
		],
		"name": "Transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			}
		],
		"name": "ApproveAttorney",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Tok",
				"type": "bytes32"
			}
		],
		"name": "ClearAttorneByAttorney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "fee",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "Issuer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "Data",
				"type": "bytes32"
			}
		],
		"name": "EIssueNewToken",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "Tok",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "Sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Attorney",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "SC",
				"type": "bool"
			}
		],
		"name": "EAttorney",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "Tok",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "Sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "From",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "To",
				"type": "address"
			}
		],
		"name": "ETransfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "Tok",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "Sender",
				"type": "address"
			}
		],
		"name": "EBurn",
		"type": "event"
	}
];