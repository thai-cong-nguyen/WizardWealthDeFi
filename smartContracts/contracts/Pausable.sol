//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Pausable is Ownable {
    uint256 public last_pause_time;
    bool public paused;

    constructor() {
        require(owner() != address(0), "Owner must be set");
    }

    modifier notPaused() {
        require(
            !paused,
            "This action cannot be executed while the contract is paused"
        );
    }

    /// @notice This function is used for setting "paused" value
    /// @dev Only the contract owner may call this function
    /// @param _paused a parameter is used for setting paused (must be followed by parameter name)
    function setPaused(bool _paused) external onlyOwner {
        if (_paused == paused) return;

        paused = _paused;

        if (paused) {
            last_pause_time = block.timestamp;
        }

        emit PausedChanged(paused);
    }

    // Event
    event PausedChanged(bool isPaused);
}
