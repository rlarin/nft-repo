// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    mapping(address => uint) public walletWaves;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        walletWaves[msg.sender] += 1;
        console.log("%s has waved! %d times", msg.sender, walletWaves[msg.sender]);
    }

    function getTotalWaves() view public returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getWavesByWallet(address _address) view public returns (uint) {
        console.log("%s has %d total waves!",_address, walletWaves[_address]);
        return walletWaves[_address];
    }
}
