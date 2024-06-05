// contracts/CappedToken.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MintableToken.sol";

contract CappedToken is MintableToken {
    uint256 private _cap;

    constructor(uint256 initialSupply, uint256 __cap) MintableToken(initialSupply) {
        require(__cap >= initialSupply, "Cap should be greater than or equal to the initial supply");
        _cap = __cap;
    }

    function cap() public view returns (uint256) {
        return _cap;
    }

    function mint(address _to, uint256 _value) public override {
        require(totalSupply + _value <= _cap, "CappedToken: cap exceeded");
        super.mint(_to, _value);
    }
}
