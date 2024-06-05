// contracts/PausableToken.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BasicERC20Token.sol";

contract PausableToken is BasicERC20Token {
    bool private paused;
    address private owner;

    event Paused(address account);
    event Unpaused(address account);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(paused, "Pausable: not paused");
        _;
    }

    constructor(uint256 initialSupply) BasicERC20Token(initialSupply) {
        owner = msg.sender;
        paused = false;
    }

    function pause() public onlyOwner whenNotPaused {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public onlyOwner whenPaused {
        paused = false;
        emit Unpaused(msg.sender);
    }

    function transfer(address _to, uint256 _value) public override whenNotPaused returns (bool success) {
        return super.transfer(_to, _value);
    }

    function approve(address _spender, uint256 _value) public override whenNotPaused returns (bool success) {
        return super.approve(_spender, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public override whenNotPaused returns (bool success) {
        return super.transferFrom(_from, _to, _value);
    }
}
