// SPDX-License-Identifier: MIT

pragma solidity ^0.6;

contract A {
    /**
     * @notice userdoc from A
     * @dev devdoc from A
     * @param x x from A
     */
    function foo(uint x) external virtual {}
}

contract B is A {
    /**
     * @inheritdoc A
     * @notice userdoc redefined in B
     */
    function foo(uint x) external override {}
}
