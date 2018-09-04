pragma solidity ^0.4.24;
pragma experimental "v0.5.0";


contract ViraCoinToken {
    
    struct TokenData {       
        bytes32 UUID;
        bytes32 Data;
        uint256 Production;
        uint256 Registration;
        address CurrentOwner;
        address InitalOwner;
        address Isuuer;
        uint256 Price;
        bool Available;
        bool Initaited;
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
        require(msg.value >= RegisterPrice,"Pay Price");
        _;
    } 
    
    function Register(bytes initVector,bytes32 uUID,uint256 production,uint256 price) public  payable CanRegister returns (bytes32){
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
        Tokens[uUID].Isuuer=msg.sender;
        Tokens[uUID].Price=price;
        Tokens[uUID].Available=true;
        Tokens[uUID].Initaited=true;
        
        return Tokens[uUID].Data;
    }
    
     function Register(bytes initVector,bytes32 uUID,uint256 production,uint256 price,address owner) public payable CanRegister returns (bytes32){
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
        Tokens[uUID].Isuuer=msg.sender;
        Tokens[uUID].Price=price;
        Tokens[uUID].Available=true;
        Tokens[uUID].Initaited=true;
        
        return Tokens[uUID].Data;
    }
}

