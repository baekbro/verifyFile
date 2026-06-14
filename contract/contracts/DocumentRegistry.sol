// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentRegistry {
    mapping(bytes32 => uint256) private documents;

    event DocumentRegistered(bytes32 indexed hash, uint256 timestamp);

    function registerDocument(bytes32 _hash) external {
        require(documents[_hash] == 0, "Already registered");
        documents[_hash] = block.timestamp;
        emit DocumentRegistered(_hash, block.timestamp);
    }

    function verifyDocument(bytes32 _hash) external view returns (bool exists, uint256 registeredAt) {
        uint256 ts = documents[_hash];
        return (ts != 0, ts);
    }
}
