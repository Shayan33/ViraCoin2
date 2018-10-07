pragma solidity ^0.4.24;
contract ViraTokens {
    
    struct CarpetData {       
        bytes32 tok;
        bytes32 Data;
        uint256 Production;
        bool Available;
        bool Initaited;
    }
    
    struct Phase{
        uint256 PhaseTotallSupply;
        uint256 PhaseSpentSupply;
        uint256 PhaseMaxTokenDisterbutionAllowed;
    }
    
    struct ICORegister{
        bool Registered;
        bool Confirmed;
    }
    
    
    mapping ( uint256 => CarpetData ) Carpets;
    mapping(bytes32=>bool) Registered;
    uint256 CarpetsCount;
    bool InitatingPhase;   
    
    mapping(address => uint)  Balances;
    mapping(address=>ICORegister) RegisteredForICO;
    
        
    string public constant name= "Vira Coin";
    string public constant symbol="VC";
    uint256 public constant decimals = 18;
    uint256 public price;
    uint256 public totalSupply;
    uint256 public SpentSupply;
    uint256 public TeamSupply;
    uint256 public ReservedSupply;
    uint256 public CrowdSaleSupply;
    uint256 public CrowdSaleSpentSupply;
    
    Phase[5] phases;
    int32 phaseNumber=-1;
    
    mapping (address=>bool) ExceptionalContracts;
    
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
    function UpdatePrice(uint256 value)public ContractOwner {
        price=value;
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
     function Mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b);
        return c;
    }
    function Div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0); // Solidity only automatically asserts when dividing by 0
        uint256 c = a / b;

        return c;
    }
    
    function IsContract(address addr)internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
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
    
    function AddExceptionalContract(address con)public ContractOwner{
        ExceptionalContracts[con]=true;
    }
    
    function SetPhase(uint256 _phaseSupply,uint256 _phaseMaxToken) public ContractOwner{
        InitatingPhase=false;
        require(phaseNumber<4,"ICO is done.");
        phaseNumber++;
        phases[uint256(phaseNumber)].PhaseTotallSupply=_phaseSupply;
        phases[uint256(phaseNumber)].PhaseMaxTokenDisterbutionAllowed=_phaseMaxToken;
        phases[uint256(phaseNumber)].PhaseSpentSupply=0;
       
    }
    function UpdatePhase(uint256 _phaseSupply,uint256 _phaseMaxToken) public ContractOwner{
        require(phaseNumber>=0,"ICO is not started yet");
        require(phaseNumber<4,"ICO is done.");
        phases[uint256(phaseNumber)].PhaseTotallSupply=_phaseSupply;
        phases[uint256(phaseNumber)].PhaseMaxTokenDisterbutionAllowed=_phaseMaxToken;
        phases[uint256(phaseNumber)].PhaseSpentSupply=0;
       
    }
    
    function ConfirmForICO(address who)public ContractOwner{
        RegisteredForICO[who].Confirmed=true;
    }
    constructor(uint256 _totallSupply,uint256 _reserverdSupply,uint256 _teamSupply,uint256 _price) public {
        totalSupply = _totallSupply;
        TeamSupply=_teamSupply;
        ReservedSupply=_reserverdSupply;
        CrowdSaleSupply=_totallSupply-(_reserverdSupply+_teamSupply);
        CrowdSaleSpentSupply=0;
        SpentSupply=0;
        price=_price;
        
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
        if(IsContract(_to)) require(ExceptionalContracts[_to],"You cant Send Any Token to this Contract!!!");
        Balances[msg.sender]=Sub(Balances[msg.sender],value);
        Balances[_to]=Add(Balances[_to],value);
    }

    function ICO(address recipient,uint256 value)public ContractOwner Initiated {
        require(Add(SpentSupply,value)<=totalSupply,"insufficient funds.");
        require(value>0,"no negetive coins allowed.");
        SpentSupply=Add(SpentSupply,value);
        Balances[recipient]=value;
    }
    
    function ICOAdd(address recipient,uint256 value)public ContractOwner Initiated{
        require(Add(SpentSupply,value)<=totalSupply,"insufficient funds.");
        require(value>0,"no negetive coins allowed.");
        SpentSupply=Add(SpentSupply,value);
        Balances[recipient]=Add(Balances[recipient],value);
    }
    function Register()public Initiated{
        RegisteredForICO[msg.sender].Registered=true;
    }
    
    function Deposite()public payable Initiated{
        require(RegisteredForICO[msg.sender].Registered,"You should Registered For ICO.");
        require(RegisteredForICO[msg.sender].Confirmed,"You are not accepted For ICO.");
        uint256 value=Div(msg.value,price);
        require(value>0,"no negetive coins allowed.");
        require(Add(SpentSupply,value)<=totalSupply,"insufficient funds.");
        require(phases[uint256(phaseNumber)].PhaseMaxTokenDisterbutionAllowed>=value,"You cant buy this much at this phase.");
        require(Add(phases[uint256(phaseNumber)].PhaseSpentSupply,value)<=phases[uint256(phaseNumber)].PhaseTotallSupply,"insufficient funds fot this phase.");
        phases[uint256(phaseNumber)].PhaseSpentSupply=Add(phases[uint256(phaseNumber)].PhaseSpentSupply,value);
        SpentSupply=Add(SpentSupply,value);
        Balances[msg.sender]=Add(Balances[msg.sender],value);
    }
    
    function GetPhaseSupply()public view returns(uint256){
        return phases[uint256(phaseNumber)].PhaseTotallSupply;
    }
    
    function GetPhaseSpentSupply()public view returns(uint256){
        return phases[uint256(phaseNumber)].PhaseSpentSupply;
    }
    
    function GetPhaseMax()public view returns(uint256){
        return phases[uint256(phaseNumber)].PhaseMaxTokenDisterbutionAllowed;
    }
}
