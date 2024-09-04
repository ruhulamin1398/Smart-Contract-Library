// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BasicERC20BurnableToken is ERC20, ERC20Burnable {
    constructor(uint256 initialSupply) ERC20("BasicERC20BurnableToken", "BEBT") {
        _mint(msg.sender, initialSupply);
    }
}
