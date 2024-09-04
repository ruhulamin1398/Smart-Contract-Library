// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract SuperShopRewards is ERC20, Ownable {
    uint8 private constant DECIMALS = 18;

    constructor(uint256 initialSupply) ERC20("Super Shop Reward", "SSR") {
        _mint(msg.sender, initialSupply * 10**DECIMALS);
    }

    /**
     * @dev Mint new tokens as rewards
     * @param amount The amount of tokens to mint
     */
    function mintRewards(uint256 amount) external onlyOwner {
        _mint(msg.sender, amount * 10**DECIMALS);
    }

    /**
     * @dev Get the total supply of the token
     * @return The total supply of the token
     */
    function getTotalSupply() external view returns (uint256) {
        return totalSupply();
    }

    /**
     * @dev Get the balance of a specific account
     * @param account The address of the account to check
     * @return The balance of the specified account
     */
    function getBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }

    /**
     * @dev Transfer tokens to a specific address
     * @param recipient The address of the recipient
     * @param amount The amount of tokens to transfer
     * @return True if the transfer was successful
     */
    function transferTokens(address recipient, uint256 amount) external returns (bool) {
        require(recipient != address(0), "Invalid recipient address");
        return transfer(recipient, amount * 10**DECIMALS);
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param sender The address of the sender
     * @param recipient The address of the recipient
     * @param amount The amount of tokens to transfer
     * @return True if the transfer was successful
     */
    function transferTokensFrom(address sender, address recipient, uint256 amount) external returns (bool) {
        require(recipient != address(0), "Invalid recipient address");
        return transferFrom(sender, recipient, amount * 10**DECIMALS);
    }

    /**
     * @dev Approve an address to spend tokens on behalf of the owner
     * @param spender The address of the spender
     * @param amount The amount of tokens to approve
     * @return True if the approval was successful
     */
    function approveSpender(address spender, uint256 amount) external returns (bool) {
        require(spender != address(0), "Invalid spender address");
        return approve(spender, amount * 10**DECIMALS);
    }

    /**
     * @dev Check the allowance of a spender for a specific owner
     * @param owner The address of the owner
     * @param spender The address of the spender
     * @return The remaining amount that the spender is allowed to spend on behalf of the owner
     */
    function getAllowance(address owner, address spender) external view returns (uint256) {
        return allowance(owner, spender);
    }

    /**
     * @dev Burn tokens from an account (only owner can burn)
     * @param account The address of the account to burn tokens from
     * @param amount The amount of tokens to burn
     */
    function burnTokens(address account, uint256 amount) external onlyOwner {
        require(account != address(0), "Invalid account address");
        _burn(account, amount * 10**DECIMALS);
    }
}
