// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {I as J, E, k} from './S08_I.sol';

contract C is J, k.K {
    /// @inheritdoc J
    function foo() external override {}

    /// @inheritdoc k.K
    function bar() external override{}
}
