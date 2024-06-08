// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract WrappedBTC is ERC20 {
    constructor() ERC20("WrappedBTC", "WBTC") {
        _mint(msg.sender, 5000 * 10 ** 18);
    }
}
