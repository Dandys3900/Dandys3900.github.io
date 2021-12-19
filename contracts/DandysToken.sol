/* It will implement ERC20 standard methods
In charge of behaviour of my crypto */

pragma solidity >=0.4.22 <0.9.0;

contract DandysToken {
    uint256 public totalSupply;
    //Construct
    constructor() public {
        totalSupply = 1000000; //Number of all tokens ever made
    }
    //Set the number of tokens
    //Read total number of tokens
}