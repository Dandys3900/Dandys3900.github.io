// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./DandysToken.sol";

contract DandysTokenSale {
    address admin;
    DandysToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    bool private disable;

    event Sell(address _buyer, uint256 _amount);
    
    constructor(DandysToken _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        disable = false;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(disable == false);
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        selfdestruct(payable(address(admin)));
        disable = true;
        tokenPrice = 0;
    }
}