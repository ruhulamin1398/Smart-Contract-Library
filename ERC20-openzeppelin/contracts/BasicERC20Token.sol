// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract BasicToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("BasicToken", "BSC") {
        _mint(msg.sender, initialSupply);
    }
}
