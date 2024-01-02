//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStakingRewards {
    // View Functions

    function balanceOf(address _amount) external view returns (uint256);

    function earned(address _account) external view returns (uint256);

    function getRewardForDuration() external view returns (uint256);

    function lastTimeRewardApplicable() external view returns (uint256);

    function rewardPerToken() external view returns (uint256);

    function rewardsDistribution() external view returns (address);

    function totalSupply() external view returns (uint256);

    // Mutative

    function getReward() external;

    function stake(uint256 _amount) external;

    function withdraw(uint256 _amount) external;
}
