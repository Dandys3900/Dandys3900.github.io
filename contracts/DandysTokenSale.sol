// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./DandysToken.sol"; //in order to use DandysToken var on line 9

contract DandysTokenSale {
    address admin; //keep trace of admin account, not public, dont want to expose it to public
    DandysToken public tokenContract; //public - solidity automatically generetes function for us
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);
    
    constructor(DandysToken _tokenContract, uint256 _tokenPrice) {
        //Assign an admin - superuser with special powers, external accout connected to blockchain
        admin = msg.sender;
        //Assign Token contract from admin account
        tokenContract = _tokenContract;
        //Set Token price
        tokenPrice = _tokenPrice;
    }

    //Create safe function for calculation value of specifed amount of given tokens
    function multiply(uint x, uint y) internal pure returns (uint z) { //internal - only in contract, pure - not reading/writing in blockchain
        require(y == 0 || (z = x * y) / y == x); //Taken from dsmath on Github
    }

    // Buy tokens
    function buyTokens(uint256 _numberOfTokens) public payable { //payable - send eth with this transaction, menas we need to pass some eth to function
        //check number of tokens requires to their value, we want to avoid under/over paying
        require(msg.value == multiply(_numberOfTokens, tokenPrice)); //another metadata thanks to test function passing "value" parameter in metadata block

        //Check if the contract has enough tokens for sale

        //Keep track of amount of sold tokens
        tokensSold += _numberOfTokens;
        //Sell event
        emit Sell(msg.sender, _numberOfTokens);
    }
}