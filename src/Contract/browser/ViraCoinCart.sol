pragma solidity ^0.4.24;

import "browser/ViraCoinToken.sol";


contract ViraCoinCart {
    
        struct TokenData{
            bytes32 TokenID;
            bytes32 Data;
            uint256 Price;
            address Owner;
            bool Available;
            bool ForSale;
            bool Processing;
        }
        
        string public constant name= "Vira Coin Cart";
        string public constant symbol="VCC";
        uint256 public constant decimals = 18;
        uint256 public Fee;
        
        address CurrentOwner;
        
        ViraCoinToken VCT;
        mapping(bytes32=>TokenData)Tokens;
        mapping(address=>uint256) Funds;
        constructor(uint256 fee,address VCTA) public{
            CurrentOwner=msg.sender;
            Fee=fee;
            VCT=ViraCoinToken(VCTA);
        }
    
        function() external payable{ 
         
        }
        
        modifier ContractOwner {
        require(msg.sender == CurrentOwner,"Only Contract Owner.");
        _;
        }
        
        modifier CanAdd {
        require(msg.value >= Fee,"Pay Price.");
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
        
        function UpdateFee(uint256 NewFee)public ContractOwner{
            Fee=NewFee;
        }
        
        event ENewAsset(bytes32 TokenID,bytes32 Data,address Owner,uint256 Price);
        function NewAsset(bytes32 TokenID,bytes32 Data,uint256 Price) public payable CanAdd{
            require(!Tokens[TokenID].ForSale,"Already In Shop.");
            require(VCT.ApproveAttorney(TokenID),"First set Shop as your asset attorny.");
            require(VCT.GetTokenOwner(TokenID)==msg.sender,"Only Token Owner.");
            require(VCT.AttorneyGet(TokenID)==Data,"Wrong Data.");
            Tokens[TokenID].TokenID=TokenID;
            Tokens[TokenID].Data=Data;
            Tokens[TokenID].Owner=msg.sender;
            Tokens[TokenID].Price=Price;
            Tokens[TokenID].Available=true;
            Tokens[TokenID].ForSale=true;
            emit ENewAsset(TokenID,Data,msg.sender,Price);
        }
                
        function Add(uint256 _a,uint256 _b)internal pure returns(uint256){
            uint256 c = _a + _b;
            require(c >= _a);
            return c;
        }
        event EBuy(bytes32 TokenID,address To);
        //check exception raise
        function Buy(bytes32 TokenID) public payable{
            require(Tokens[TokenID].ForSale,"Not Available.");
            require(Tokens[TokenID].Price<=msg.value,"Not enough fund.");
            Funds[Tokens[TokenID].Owner]=Add(Funds[Tokens[TokenID].Owner],Tokens[TokenID].Price);
            VCT.AttorneyTransfer(TokenID,msg.sender);
            Tokens[TokenID].Owner=msg.sender;
            Tokens[TokenID].ForSale=false;
            emit EBuy(TokenID,msg.sender);
        }
        
        event EWithdrawFunds(address Withdrawer,uint256 value);
        function WithdrawFunds()public {
            require(Funds[msg.sender]>0,"you have no funds.");
            uint256 val=Funds[msg.sender];
            Funds[msg.sender]=0;
            msg.sender.transfer(val);
            emit EWithdrawFunds(msg.sender,val);
        }
        
        event EUpdatePrice(bytes32 TokenID,uint256 From,uint256 To);
        function UpdatePrice(bytes32 TokenID,uint256 NewPrice) public{
            require(Tokens[TokenID].ForSale,"Not Available.");
            require(Tokens[TokenID].Owner==msg.sender,"Only Owner");
            uint256 Price=Tokens[TokenID].Price;
            Tokens[TokenID].Price=NewPrice;
            emit EUpdatePrice(TokenID,Price,NewPrice);
        }
        
}
