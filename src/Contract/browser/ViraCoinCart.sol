pragma solidity ^0.4.24;

import "browser/ViraCoinToken.sol";


contract ViraCoinCart {
    
        struct TokenData{
            bytes32 TokenID;
            bytes32 Data;
            bytes32 Price;
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
        
        function NewAsset(bytes32 TokenID,bytes32 Data,bytes32 Price) public payable CanAdd{
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
            
        }
        
}
