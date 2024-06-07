// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/security/Pausable.sol";

contract ARCoin is ERC20, Ownable, Pausable {
    uint256 private constant APY_BASE = 1e4; // Base for APY calculation (100%)

    struct StakingInfo {
        uint256 stakedAmount;
        uint256 createdAt;
        uint256 apy;
    }

    mapping(address => StakingInfo) public stakingInfo;

    event Staked(address indexed staker, uint256 amount, uint256 apy);
    event Unstaked(address indexed staker, uint256 amount);

    constructor() ERC20("ARCoin", "ARC") {
        _mint(msg.sender, 1000000000 * 10 ** decimals()); // Mint 1 billion tokens to the contract deployer
    }

    function stake(uint256 amount, uint256 apy) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        require(apy > 0, "APY must be greater than zero");

        _burn(msg.sender, amount);
        stakingInfo[msg.sender] = StakingInfo(amount, block.timestamp, apy);
        emit Staked(msg.sender, amount, apy);
    }

    function unstake() external whenNotPaused {
        StakingInfo storage info = stakingInfo[msg.sender];
        require(info.stakedAmount > 0, "No tokens staked");

        uint256 interest = calculateInterest(info);
        uint256 totalAmount = info.stakedAmount + interest;

        _mint(msg.sender, totalAmount);
        delete stakingInfo[msg.sender];

        emit Unstaked(msg.sender, totalAmount);
    }

    function calculateInterest(StakingInfo memory info) internal view returns (uint256) {
        uint256 timeElapsed = block.timestamp - info.createdAt;
        return (info.stakedAmount * info.apy * timeElapsed) / (365 days * APY_BASE);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
