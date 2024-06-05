// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract StakingToken is ERC20, Ownable, Pausable {
    uint private constant APY_BASE = 1e4; // Base for APY calculation (100%)

    struct StakingInfo {
        uint stakedAmount;
        uint createdAt;
        uint apy;
    }

    mapping(address => StakingInfo) public stakingInfo;

    event Staked(address indexed staker, uint amount, uint apy);
    event Unstaked(address indexed staker, uint amount);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function stake(uint amount, uint apy) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        require(apy > 0, "APY must be greater than zero");

        _burn(msg.sender, amount);
        stakingInfo[msg.sender] = StakingInfo(amount, block.timestamp, apy);
        emit Staked(msg.sender, amount, apy);
    }

    function unstake() external whenNotPaused {
        StakingInfo storage info = stakingInfo[msg.sender];
        require(info.stakedAmount > 0, "No tokens staked");

        uint interest = calculateInterest(info);
        uint totalAmount = info.stakedAmount + interest;

        _mint(msg.sender, totalAmount);
        delete stakingInfo[msg.sender];

        emit Unstaked(msg.sender, totalAmount);
    }

    function calculateInterest(StakingInfo memory info) internal view returns (uint) {
        uint timeElapsed = block.timestamp - info.createdAt;
        return (info.stakedAmount * info.apy * timeElapsed) / (365 days * APY_BASE);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}

