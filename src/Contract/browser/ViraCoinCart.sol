pragma solidity ^0.4.24;

import "browser/ViraCoinToken.sol";


contract ViraCoinCart {
    
        struct TokenData{
            bytes32 TokenID;
            bytes32 Data;
            uint256 Production;
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
        
        function Withdraw() public ContractOwner{
            CurrentOwner.transfer(address(this).balance);
        }
    
        function Kill() public ContractOwner{
            selfdestruct(CurrentOwner);
        }
        
        function PassAuthority(address newOwner) public ContractOwner{
            CurrentOwner=newOwner;
        }
        
        function ChangeFee(uint256 NewFee)public ContractOwner{
            Fee=NewFee;
        }
        
        
}
