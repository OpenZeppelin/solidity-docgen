pragma solidity ^0.8;

contract Bar {
}

/**
 * @dev some devdoc
 */
contract Foo is Bar {
    /**
     * @dev and a function
     */
    function foo() external {
    }
}

/**
 * Some Unicode characters: ⇌ £ ह 𐍈 ⇌ £ ह 𐍈
 */
contract X {
    /**
     * A function
     */
    function foo() external {}
}
