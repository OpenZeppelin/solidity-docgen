// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {I as J, E} from './S08_I.sol';

contract C is J {
    /// @inheritdoc J
    function foo() external override {}
}
