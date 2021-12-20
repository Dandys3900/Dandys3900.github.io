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

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf; //key(account) - value(account balance), name of variable is because of ERC20 standard
    //allowance
    mapping(address => mapping(address => uint256)) public allowance;

    //Construct
    constructor(uint256 _initSupply) public { //_ - convencion, not compulsory
        balanceOf[msg.sender] = _initSupply; //msg is global variable in Solidity, msg.sender is the address of account, adress of who called this function
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

    //Delegated transfer - action performed by the name of one account, but which is paid by the second account, not used by our crypto, but needed by ERC20, something like approve bank manager to invest your money
    //approve event
    function approve(address _spender, uint256 _value) public returns (bool success) {
        //Allowance
        allowance[msg.sender][_spender] = _value;
        
        //Aprove event
        emit Approval(msg.sender, _spender, _value);
        
        return true;
    }

    //Function for spending allowed amount of money from one account by the other account
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) { //state variables such as bool should be without _
        //Make sure _from account has enough tokens
        require(balanceOf[_from] >= _value);

        //Make sure we dont transfer more tokens than we have approved
        require(allowance[_from][msg.sender] >= _value);
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        //Update the allowance
        allowance[_from][msg.sender] -= _value;

        //Transfer events
        emit Transfer(_from, _to, _value);

        return true;
    }
}