// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract CappedToken is ERC20Capped {
    constructor(uint256 initialSupply, uint256 cap) ERC20("CappedToken", "CAP") ERC20Capped(cap) {
        require(initialSupply <= cap, "Initial supply exceeds cap");
        _mint(msg.sender, initialSupply);
    }

    function mint(address account, uint256 amount) public {
        require(totalSupply() + amount <= cap(), "CappedToken: cap exceeded");
        _mint(account, amount);
    }
}
