// contracts/BurnableToken.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BasicERC20Token.sol";

contract BurnableToken is BasicERC20Token {

    event Burn(address indexed burner, uint256 value);

    constructor(uint256 initialSupply) BasicERC20Token(initialSupply) {}

    function burn(uint256 _value) public {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance to burn");
        balanceOf[msg.sender] -= _value;
        totalSupply -= _value;
        emit Burn(msg.sender, _value);
    }
}
