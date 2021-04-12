// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

abstract contract Token is ERC20 {
    /**
     * @dev own function
     */
    function own() public {}
}
