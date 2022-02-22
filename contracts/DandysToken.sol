// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract DandysToken {
    string public name = "Dandys Coin";
    string public symbol = "DDC";
    string public standard = "DDC Token v1.0";
    uint256 public totalSupply;

    /************************************************************************/
    /*  Event when transfer() and transferFrom() functions are called.      */
    /*  Contains info about sender, receiver addresses and the amount       */
    /*  of transfered tokens.                                               */
    /************************************************************************/
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    /************************************************************************/
    /*  Event when approve() function is called.                            */
    /*  Contains address of the owner of the funds(_owner), spender address */
    /*  who can spend owner´s funds(_spender) and the amount of spent       */
    /*  tokens(_value).                                                     */
    /************************************************************************/
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initSupply) {
        balanceOf[msg.sender] = _initSupply;
        totalSupply = _initSupply;
    }

    /************************************************************************/
    /*  transfer() function to transfer exact amount of tokens(_value) from */
    /*  actual user(msg.sender) to receiver(_to) and calls the Transfer     */
    /*  event.                                                              */
    /************************************************************************/
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    /************************************************************************/
    /*  approve() function for approving spender (_spender) to spend actual */
    /*  user(msg.sender) tokens(_value) and calls the Approval event.       */
    /************************************************************************/
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        
        emit Approval(msg.sender, _spender, _value);
        
        return true;
    }

    /************************************************************************/
    /*  transferFrom() function to transfer exact amount of tokens(_value)  */
    /*  from one user(_from) to another(_to) and calls the Transfer event.  */
    /************************************************************************/
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);

        require(allowance[_from][msg.sender] >= _value);
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}
