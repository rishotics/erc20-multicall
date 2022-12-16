// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import './Multicall.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract EOA2ScwMigrator is Multicall {

    function approveToken(address  token, address spender, uint amount) public {
        IERC20(token).approve(spender, amount);
    }

    function sendToken(address token, address to, uint amount) public {
        IERC20(token).transfer(to, amount);
    }
     
}
