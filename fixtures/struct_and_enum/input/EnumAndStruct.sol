// SPDX-License-Identifier: MIT

pragma solidity ^0.6;

/**
 * @dev dev docs
 * @notice user docs
 */
contract EnumAndStructFoo {
  /// @custom:enum Foo enum
  enum Foo {
    FOO,
    BAR
  }

  struct Bar {
    uint256 foo;
  }
}
