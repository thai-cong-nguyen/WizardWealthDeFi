//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@uniswap/v2-periphery/contracts/interfaces/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract LiquidityContract {
    address private FACTORY;
    address private ROUTER;
    address private WETH;

    constructor(address _FACTORY, address _WETH) public {
        FACTORY = _FACTORY;
        WETH = _WETH;
    }
}
