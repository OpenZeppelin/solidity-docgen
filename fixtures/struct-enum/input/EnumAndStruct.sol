// SPDX-License-Identifier: MIT

pragma solidity ^0.6;

contract StructAndEnum {
  /// @dev This is foo
  enum Foo {
    FOO,
    BAR
  }

  /// @dev This is bar
  struct Bar {
    uint256 foo;
    string bar;
  }
}
