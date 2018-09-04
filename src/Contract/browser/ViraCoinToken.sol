pragma solidity ^0.4.24;
pragma experimental "v0.5.0";


contract ViraCoinToken {
    
    struct TokenData {       
        bytes32 tok;
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
        //bool HaveAttorneyOwner;
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

     function() external payable
     { 
         
     }

       modifier CanRegister {
        require(msg.value >= RegisterPrice,"Pay Price.");
        _;
    } 
    
         modifier ContractOwner {
        require(msg.sender == CurrentOwner,"Only Contract Owner.");
        _;
    } 
    
    function Withdraw() public ContractOwner{
        CurrentOwner.transfer(address(this).balance);
    }
    
    function Kill() public ContractOwner{
        selfdestruct(CurrentOwner);
    }
    function PassAuthority(address newOwner) public ContractOwner{
        CurrentOwner=newOwner;
    }
    
    event EIssueNewToken(address Issuer,address Owner,bytes32 ID,bytes32 Data);
    
    function IssueNewToken(bytes initVector,bytes32 tok,uint256 production/*,uint256 price*/) public  payable CanRegister returns (bytes32){
        require(!Tokens[tok].Available,"Available");
        require(!Tokens[tok].Initaited,"Double");
        bytes32 InitVector=keccak256(initVector);
        require(!Registered[InitVector],"Already Exist.");
        Tokens[tok].tok=tok;
        Registered[InitVector]=true;
        Tokens[tok].Production=production;
        uint256 Now=now;
        bytes32 BaseData=keccak256(abi.encodePacked(tok,initVector,production,Now,msg.sender));
        Tokens[tok].Data=BaseData;
        Tokens[tok].Registration=Now;
        Tokens[tok].CurrentOwner=msg.sender;
        Tokens[tok].InitalOwner=msg.sender;
        Tokens[tok].Issuer=msg.sender;
        //Tokens[tok].Price=price;
        Tokens[tok].Available=true;
        Tokens[tok].Initaited=true;
        
        emit EIssueNewToken(Tokens[tok].Issuer,Tokens[tok].CurrentOwner,tok,Tokens[tok].Data);
        return Tokens[tok].Data;
    }
    
    function IssueNewToken(bytes initVector,bytes32 tok,uint256 production/*,uint256 price*/,address owner) public payable CanRegister returns (bytes32){
        require(!Tokens[tok].Available,"Available");
        require(!Tokens[tok].Initaited,"Double");
        bytes32 InitVector=keccak256(initVector);
        require(!Registered[InitVector],"Already Exist.");
        Tokens[tok].tok=tok;
        Registered[InitVector]=true;
        Tokens[tok].Production=production;
        uint256 Now=now;
        bytes32 BaseData=keccak256(abi.encodePacked(tok,initVector,production,Now,msg.sender));
        Tokens[tok].Data=BaseData;
        Tokens[tok].Registration=Now;
        Tokens[tok].CurrentOwner=owner;
        Tokens[tok].InitalOwner=owner;
        Tokens[tok].Issuer=msg.sender;
        //Tokens[tok].Price=price;
        Tokens[tok].Available=true;
        Tokens[tok].Initaited=true;
        
        emit EIssueNewToken(Tokens[tok].Issuer,Tokens[tok].CurrentOwner,tok,Tokens[tok].Data);
        return Tokens[tok].Data;
    }
    
    event EAttorney(bytes32 Tok,address Sender,address Attorney,bool SC);
    
    function SetAttorney(bytes32 Tok,address Attorney/*,bytes32 Secret*/)public{
        require(Tokens[Tok].Available,"Not Available");
        require(Tokens[Tok].Initaited,"No shch a coin exist.");
        require(Tokens[Tok].CurrentOwner==msg.sender,"Only Owner.");
        Tokens[Tok].AttorneyOwner=Attorney;
        //Tokens[Tok].AttorneySecret=keccak256(abi.encodePacked(Secret));
        //Tokens[Tok].HaveAttorneyOwner=true;
        emit  EAttorney(Tok,msg.sender,Tokens[Tok].AttorneyOwner,true);
    }
    function ClearAttorne(bytes32 Tok)public{
        require(Tokens[Tok].Available,"Not Available");
        require(Tokens[Tok].Initaited,"No shch a coin exist.");
        require(Tokens[Tok].CurrentOwner==msg.sender,"Only Owner.");
        Tokens[Tok].AttorneyOwner=0x0000000000000000000000000000000000000000;
        //Tokens[Tok].AttorneySecret=keccak256(abi.encodePacked(0x0000000000000000000000000000000000000000));
        //Tokens[Tok].HaveAttorneyOwner=false;
        emit  EAttorney(Tok,msg.sender,Tokens[Tok].AttorneyOwner,false);
    }
    function ClearAttorneByAttorne(bytes32 Tok)public{
        require(Tokens[Tok].Available,"Not Available");
        require(Tokens[Tok].Initaited,"No shch a coin exist.");
        require(Tokens[Tok].AttorneyOwner==msg.sender,"Only Attorne.");
        Tokens[Tok].AttorneyOwner=0x0000000000000000000000000000000000000000;
        //Tokens[Tok].AttorneySecret=keccak256(abi.encodePacked(0x0000000000000000000000000000000000000000));
        //Tokens[Tok].HaveAttorneyOwner=false;
        emit  EAttorney(Tok,msg.sender,Tokens[Tok].AttorneyOwner,false);
    }
    
    function PassAttorne(bytes32 Tok,address Attorney/*,bytes32 Secret*/)public{
        require(Tokens[Tok].Available,"Not Available");
        require(Tokens[Tok].Initaited,"No shch a coin exist.");
        require(Tokens[Tok].AttorneyOwner==msg.sender,"Only Attorne.");
        Tokens[Tok].AttorneyOwner=Attorney;
        //Tokens[Tok].AttorneySecret=keccak256(abi.encodePacked(Secret));
        emit  EAttorney(Tok,msg.sender,Tokens[Tok].AttorneyOwner,true);
    }
    
    function GetData(bytes32 Tok) public view returns(
        bytes32 tok,
        bytes32 Data,
        uint256 Production,
        uint256 Registration,
        address PrevOwner,
        address InitalOwner,
        address Issuer,
        //uint256 Price,
        address AttorneyOwner//,
        //bool HaveAttorneyOwner
        ){
        require(Tokens[Tok].Available,"Not Available");
        require(Tokens[Tok].Initaited,"No shch a coin exist.");
        require(Tokens[Tok].CurrentOwner==msg.sender,"Only Owner.");
        tok=Tokens[Tok].tok;
        Data=Tokens[Tok].Data;
        Production=Tokens[Tok].Production;
        Registration=Tokens[Tok].Registration;
        PrevOwner=Tokens[Tok].PrevOwner;
        InitalOwner=Tokens[Tok].InitalOwner;
        Issuer=Tokens[Tok].Issuer;
        //Price=Tokens[Tok].Price;
        AttorneyOwner=Tokens[Tok].AttorneyOwner;
        //HaveAttorneyOwner=Tokens[Tok].HaveAttorneyOwner;
    }
    
    event ETransfer(bytes32 Tok,address Sender,address From,address To);
    
    function Transfer(bytes32 Tok,address to) public{
        require(Tokens[Tok].Available,"Not Available");
        require(Tokens[Tok].Initaited,"No shch a coin exist.");
        require(Tokens[Tok].CurrentOwner==msg.sender,"Only Owner.");
        require(!Tokens[Tok].ISTransferring,"Transferring.");
        Tokens[Tok].ISTransferring=true;
        Tokens[Tok].PrevOwner=Tokens[Tok].CurrentOwner;
        Tokens[Tok].CurrentOwner=to;
        Tokens[Tok].AttorneyOwner=0x0000000000000000000000000000000000000000;
        //Tokens[Tok].HaveAttorneyOwner=false;
        //Tokens[Tok].AttorneySecret=keccak256(abi.encodePacked(0x0000000000000000000000000000000000000000));
        Tokens[Tok].ISTransferring=false;
        
        emit ETransfer(Tok,msg.sender,Tokens[Tok].PrevOwner,Tokens[Tok].CurrentOwner);
    }
    function AttorneyTransfer(bytes32 Tok,address to/*,bytes32 Secret*/) public{
        require(Tokens[Tok].Available,"Not Available");
        require(Tokens[Tok].Initaited,"No shch a coin exist.");
        require(Tokens[Tok].AttorneyOwner==msg.sender,"Only AttorneyOwner.");
        require(!Tokens[Tok].ISTransferring,"Transferring.");
        //require(Tokens[Tok].AttorneySecret==keccak256(abi.encodePacked(Secret)),"Wrong Secret.");
        Tokens[Tok].ISTransferring=true;
        Tokens[Tok].PrevOwner=Tokens[Tok].CurrentOwner;
        Tokens[Tok].CurrentOwner=to;
        Tokens[Tok].AttorneyOwner=0x0000000000000000000000000000000000000000;
        //Tokens[Tok].HaveAttorneyOwner=false;
        //Tokens[Tok].AttorneySecret=keccak256(abi.encodePacked(0x0000000000000000000000000000000000000000));
        Tokens[Tok].ISTransferring=false;
        
        emit ETransfer(Tok,msg.sender,Tokens[Tok].PrevOwner,Tokens[Tok].CurrentOwner);
    }

    event EBurn(bytes32 Tok,address Sender);
    function Burn(bytes32 Tok)public {
        require(Tokens[Tok].Available,"Not Available");
        require(Tokens[Tok].Initaited,"No shch a coin exist.");
        require(Tokens[Tok].CurrentOwner==msg.sender,"Only Owner.");
        Tokens[Tok].Available=false;
        Tokens[Tok].ISTransferring=true;
        Tokens[Tok].PrevOwner=Tokens[Tok].CurrentOwner;
        Tokens[Tok].CurrentOwner=0x0000000000000000000000000000000000000000;
        Tokens[Tok].AttorneyOwner=0x0000000000000000000000000000000000000000;
        //Tokens[Tok].HaveAttorneyOwner=false;
        Tokens[Tok].ISTransferring=false;
        
        emit EBurn(Tok,msg.sender);
    }
}

