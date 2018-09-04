pragma solidity ^0.4.24;
pragma experimental "v0.5.0";


contract ViraCoinToken {
    
    struct TokenData {       
        bytes32 UUID;
        bytes32 Data;
        uint256 Production;
        uint256 Registration;
        address CurrentOwner;
        address PrevOwner;
        address InitalOwner;
        address Issuer;
        //uint256 Price;
        address AttorneyOwner;
        //bytes32 AttorneySecret;
        bool Available;
        bool Initaited;
        bool HaveAttorneyOwner;
        bool ISTransferring;
    }

    string public constant name= "Vira Coin";
    string public constant symbol="VC";
    uint256 public constant decimals = 18;
    uint256 public RegisterPrice;
    
    mapping(bytes32=>bool) Registered;
    mapping (bytes32=>TokenData) Tokens;  
    address CurrentOwner;
    
    constructor(uint256 registerPrice) public{
        CurrentOwner=msg.sender;
        RegisterPrice=registerPrice;
    }

       modifier CanRegister {
        require(msg.value >= RegisterPrice,"Pay Price.");
        _;
    } 
    
         modifier ContractOwner {
        require(msg.sender == CurrentOwner,"Only Contract Owner.");
        _;
    } 
    
    function AssignAuthority(address newOwner) public ContractOwner{
        CurrentOwner=newOwner;
    }
    
    function IssueNewToken(bytes initVector,bytes32 uUID,uint256 production/*,uint256 price*/) public  payable CanRegister returns (bytes32){
        require(!Tokens[uUID].Initaited,"Double");
        bytes32 InitVector=keccak256(initVector);
        require(!Registered[InitVector],"Already Exist.");
        Tokens[uUID].UUID=uUID;
        Registered[InitVector]=true;
        Tokens[uUID].Production=production;
        uint256 Now=now;
        bytes32 BaseData=keccak256(abi.encodePacked(uUID,initVector,production,Now,msg.sender));
        Tokens[uUID].Data=BaseData;
        Tokens[uUID].Registration=Now;
        Tokens[uUID].CurrentOwner=msg.sender;
        Tokens[uUID].InitalOwner=msg.sender;
        Tokens[uUID].Issuer=msg.sender;
        //Tokens[uUID].Price=price;
        Tokens[uUID].Available=true;
        Tokens[uUID].Initaited=true;
        
        return Tokens[uUID].Data;
    }
    
    function IssueNewToken(bytes initVector,bytes32 uUID,uint256 production/*,uint256 price*/,address owner) public payable CanRegister returns (bytes32){
        require(!Tokens[uUID].Initaited,"Double");
        bytes32 InitVector=keccak256(initVector);
        require(!Registered[InitVector],"Already Exist.");
        Tokens[uUID].UUID=uUID;
        Registered[InitVector]=true;
        Tokens[uUID].Production=production;
        uint256 Now=now;
        bytes32 BaseData=keccak256(abi.encodePacked(uUID,initVector,production,Now,msg.sender));
        Tokens[uUID].Data=BaseData;
        Tokens[uUID].Registration=Now;
        Tokens[uUID].CurrentOwner=owner;
        Tokens[uUID].InitalOwner=owner;
        Tokens[uUID].Issuer=msg.sender;
        //Tokens[uUID].Price=price;
        Tokens[uUID].Available=true;
        Tokens[uUID].Initaited=true;
        
        return Tokens[uUID].Data;
    }
    function SetAttorney(bytes32 asset,address Attorney/*,bytes32 Secret*/)public{
        require(Tokens[asset].CurrentOwner==msg.sender,"Only Owner.");
        Tokens[asset].AttorneyOwner=Attorney;
        //Tokens[asset].AttorneySecret=keccak256(abi.encodePacked(Secret));
        Tokens[asset].HaveAttorneyOwner=true;
    }
    function ClearAttorne(bytes32 asset)public{
        require(Tokens[asset].CurrentOwner==msg.sender,"Only Owner.");
        Tokens[asset].AttorneyOwner=0x0000000000000000000000000000000000000000;
        //Tokens[asset].AttorneySecret=keccak256(abi.encodePacked(0x0000000000000000000000000000000000000000));
        Tokens[asset].HaveAttorneyOwner=false;
    }
    function ClearAttorneByAttorne(bytes32 asset)public{
        require(Tokens[asset].AttorneyOwner==msg.sender,"Only Attorne.");
        Tokens[asset].AttorneyOwner=0x0000000000000000000000000000000000000000;
        //Tokens[asset].AttorneySecret=keccak256(abi.encodePacked(0x0000000000000000000000000000000000000000));
        Tokens[asset].HaveAttorneyOwner=false;
    }
    
    function getData(bytes32 asset) public view returns(
        bytes32 Asset,
        bytes32 Data,
        uint256 Production,
        uint256 Registration,
        address InitalOwner,
        address Issuer,
        //uint256 Price,
        address AttorneyOwner,
        bool HaveAttorneyOwner
        ){
        require(Tokens[asset].CurrentOwner==msg.sender,"Only Owner.");
        Asset=Tokens[asset].UUID;
        Data=Tokens[asset].Data;
        Production=Tokens[asset].Production;
        Registration=Tokens[asset].Registration;
        InitalOwner=Tokens[asset].InitalOwner;
        Issuer=Tokens[asset].Issuer;
        //Price=Tokens[asset].Price;
        AttorneyOwner=Tokens[asset].AttorneyOwner;
        HaveAttorneyOwner=Tokens[asset].HaveAttorneyOwner;
    }
    
    function Transfer(bytes32 asset,address to) public{
        require(Tokens[asset].CurrentOwner==msg.sender,"Only Owner.");
        require(!Tokens[asset].ISTransferring,"Transferring.");
        Tokens[asset].ISTransferring=true;
        Tokens[asset].PrevOwner=Tokens[asset].CurrentOwner;
        Tokens[asset].CurrentOwner=to;
        Tokens[asset].AttorneyOwner=0x0000000000000000000000000000000000000000;
        Tokens[asset].HaveAttorneyOwner=false;
        //Tokens[asset].AttorneySecret=keccak256(abi.encodePacked(0x0000000000000000000000000000000000000000));
        Tokens[asset].ISTransferring=false;
    }
    function AttorneyTransfer(bytes32 asset,address to/*,bytes32 Secret*/) public{
        require(Tokens[asset].AttorneyOwner==msg.sender,"Only AttorneyOwner.");
        require(!Tokens[asset].ISTransferring,"Transferring.");
        //require(Tokens[asset].AttorneySecret==keccak256(abi.encodePacked(Secret)),"Wrong Secret.");
        Tokens[asset].ISTransferring=true;
        Tokens[asset].PrevOwner=Tokens[asset].CurrentOwner;
        Tokens[asset].CurrentOwner=to;
        Tokens[asset].AttorneyOwner=0x0000000000000000000000000000000000000000;
        Tokens[asset].HaveAttorneyOwner=false;
        //Tokens[asset].AttorneySecret=keccak256(abi.encodePacked(0x0000000000000000000000000000000000000000));
        Tokens[asset].ISTransferring=false;
    }

    
}

