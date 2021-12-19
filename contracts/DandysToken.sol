/* It will implement ERC20 standard methods
In charge of behaviour of my crypto */

pragma solidity >=0.4.22 <0.9.0;

contract DandysToken {
    //Token name
    string public name = "Dandys Token";
    //Token symbol
    string public symbol = "DDT";
    //Token standard - not part of ERC20 standard
    string public standard = "DDT Token v1.0";
    //Total count of created tokens
    uint256 public totalSupply;

    //By ERC20 standard
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf; //key(account) - value(account balance), name of variable is because of ERC20 standard

    //Construct
    constructor(uint256 _initSupply) public { //_ - convension, not compulsory
        balanceOf[msg.sender] = _initSupply; //msg is global variable in Solidity, msg.sender is the address of account
        totalSupply = _initSupply; //Number of all tokens ever made
    }
    //Set the number of tokens
    //Read total number of tokens

    function transfer(address _to, uint256 _value) public returns (bool success){ //According to ERC20
        //Check if sender has enough tokens
        require(balanceOf[msg.sender] >= _value); //If false stop function and throw error

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        //Transfer event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}