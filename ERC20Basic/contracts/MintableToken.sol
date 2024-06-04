// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BasicERC20Token.sol";

contract MintableToken is BasicERC20Token {

    event Mint(address indexed to, uint256 value);

    constructor(uint256 initialSupply) BasicERC20Token(initialSupply) {}

    function mint(address _to, uint256 _value) public {
        totalSupply += _value;
        balanceOf[_to] += _value;
        emit Mint(_to, _value);
        emit Transfer(address(0), _to, _value);
    }
}
