// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

/// Identifiers may contain '$', as ERC-7201 namespaced storage does for its struct pointer.
contract Dollar {
    struct Storage {
        uint256 value;
    }

    /**
     * @notice Loads the storage struct from its slot.
     * @return $ the storage struct pointer
     */
    function loadStorage() internal pure returns (Storage storage $) {
        assembly {
            $.slot := 0
        }
    }

    /**
     * @notice Takes a parameter whose name contains '$'.
     * @param a$b the first operand
     * @param $c the second operand
     * @return $d the sum
     */
    function add(uint256 a$b, uint256 $c) external pure returns (uint256 $d) {
        $d = a$b + $c;
    }
}
