contract Nospec { 
  function nospec();
}

/// @title Base
/// @dev A base contract
/// which works as base
contract Base {
  function base(uint anInt) public returns (bool);
}

/**
 * @title Foo
 * @dev Is a Foo contract
 */
contract Foo is Base {

  /**
   * @title Only execute sometimes
   */
  modifier onlySometimes() {
    _;
  }

  /**
   * @dev A function that foos
   * @param anInt an integer parameter
   * @return a boolean flag
   */
  function foo(uint anInt) onlySometimes public returns (bool);
}

/// @title Bar
/// @dev Is a Bar contract
contract Bar is Base {
  
  /// @dev A function that bars
  /// @param anInt an integer parameter
  /// @return a boolean flag
  function bar(uint anInt) public returns (bool);
}