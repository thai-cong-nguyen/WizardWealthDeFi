//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "./interfaces/IERC20.sol";

contract SwapContract {
    function swapExactTokensForTokens(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _to
    ) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(address(this), _amountIn);
    }
}
