pragma solidity ^0.4.24;
contract ViraTokens {
    
        struct CarpetData {       
        bytes32 tok;
        bytes32 Data;
        uint256 Production;
        bool Available;
        bool Initaited;
    }
    
    mapping ( uint256 => CarpetData ) Carpets;
    mapping(bytes32=>bool) Registered;
    uint256 CarpetsCount;
    bool InitatingPhase;    
    
    mapping(address => uint)  Balances;
    mapping(address=>bool) IsSharedOwner;
    
        
    string public constant name= "Vira Coin";
    string public constant symbol="VC";
    uint256 public constant decimals = 18;
    uint256 public totalSupply;
    uint256 public SpentSupply;
    
    address CurrentOwner;
    
    function() external payable
    { 
         
    }
    
    modifier ContractOwner {
        require(msg.sender == CurrentOwner,"Only Contract Owner.");
        _;
    }
    
    modifier Initiated {
        require(!InitatingPhase,"Initaing Phase.");
        _;
    }
    
    function GetFunds() public view ContractOwner returns(uint256){
        return address(this).balance;
    }
    
    function Withdraw() public ContractOwner{
        CurrentOwner.transfer(address(this).balance);
    }
    
    function Kill() public ContractOwner{
        selfdestruct(CurrentOwner);
    }
    
    function Owner() public view returns(bool){
        if(msg.sender == CurrentOwner)
            return true;
        else return false;
    }
    
    function GetCount() public view ContractOwner returns(uint256){
        return CarpetsCount;
    }
    
    function Add(uint256 _a,uint256 _b)internal pure returns(uint256){
        uint256 c = _a + _b;
        require(c >= _a);
        return c;
    }
    
    function Sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;
        return c;
    }
    
    function AddCarpet(bytes initVector,bytes32 tok,uint256 production) public ContractOwner returns (bool){
        require(InitatingPhase,"The Initating Phase is Over.");
        bytes32 InitVector=keccak256(initVector);
        require(!Registered[InitVector],"Already Exist.");
        CarpetsCount=Add(CarpetsCount,1);
        Carpets[CarpetsCount].tok=tok;
        Registered[InitVector]=true;
        Carpets[CarpetsCount].Production=production;
        uint256 Now=now;
        bytes32 BaseData=keccak256(abi.encodePacked(tok,initVector,production,Now,msg.sender));
        Carpets[CarpetsCount].Data=BaseData;
        Carpets[CarpetsCount].Available=true;
        Carpets[CarpetsCount].Initaited=true;
        
        return true;
    }
    
    function GetCarpet(uint256 no) public view returns(
        bytes32 tok,
        bytes32 Data,
        uint256 Production,
        bool Available,
        bool Initaited){
        require(no<=CarpetsCount,"no such carpet exists.");
        tok=Carpets[no].tok;
        Data=Carpets[no].Data;
        Production=Carpets[no].Production;
        Available=Carpets[no].Available;
        Initaited=Carpets[no].Initaited;
    }
    
    function Existe(uint256 no) public view returns(bool){
        if(no<=CarpetsCount)
            if(Carpets[no].Available) return true;
        return false;
    }
    
    function InitiatingIsOver() public ContractOwner {
        InitatingPhase=false;
    }
    
    constructor(uint256 _totallSupply) public {
        totalSupply = _totallSupply;
        SpentSupply=0;
        
        InitatingPhase=true;
        CarpetsCount=0;
        CurrentOwner=msg.sender;
    }
    
    // function balanceOf(address _tokenHolder) public view returns (uint256) { 
    //     return Balances[_tokenHolder]; 
    // }
    
    function myBalance() public view returns (uint256){
        return Balances[msg.sender];
    }
    function transfer(address _to,uint256 value)public Initiated {
        require(value>0,"no negetive coins allowed.");
        require(Balances[msg.sender]>=value,"insufficient funds.");
        require(IsSharedOwner[_to],"You cant transfer any token to this account.");
        Balances[msg.sender]=Sub(Balances[msg.sender],value);
        Balances[_to]=Add(Balances[_to],value);
    }

    function ICO(address recipient,uint256 value)public ContractOwner Initiated {
        require(Add(SpentSupply,value)<=totalSupply,"insufficient funds.");
        require(value>0,"no negetive coins allowed.");
        require(!IsSharedOwner[recipient],"already exists.");
        SpentSupply=Add(SpentSupply,value);
        IsSharedOwner[recipient]=true;
        Balances[recipient]=value;
    }
    
    function ICOAdd(address recipient,uint256 value)public ContractOwner Initiated{
        require(Add(SpentSupply,value)<=totalSupply,"insufficient funds.");
        require(value>0,"no negetive coins allowed.");
        require(IsSharedOwner[recipient],"You cant transfer any token to this account.");
        SpentSupply=Add(SpentSupply,value);
        Balances[recipient]=Add(Balances[recipient],value);
        
    }

}
