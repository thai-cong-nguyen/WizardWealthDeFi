//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IUNISWAPV2ROUTER02.sol";

contract SwapContract {
    address private UNISWAP_V2_ROUTER_ADDRESS;
    address private WETH;

    function swapExactTokensForTokens(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _to
    ) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER_ADDRESS, _amountIn);

        address[] memory path;
        path = new address[](3);
        path[0] = _tokenIn;
        path[1] = WETH;
        path[2] = _tokenOut;

        IUniswapV2Router02(UNISWAP_V2_ROUTER_ADDRESS).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            _to,
            block.timestamp
        );
    }
}
