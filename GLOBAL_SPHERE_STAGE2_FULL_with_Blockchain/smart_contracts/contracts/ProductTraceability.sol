
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ProductTraceability {
    struct Batch { uint256 id; string sku; string origin; uint256 timestamp; address owner; string metadataURI; }
    mapping(uint256 => Batch) public batches;
    uint256 public nextId = 1;
    event BatchRegistered(uint256 id, string sku, string origin, address owner);

    function registerBatch(string calldata sku, string calldata origin, string calldata metadataURI) external returns (uint256) {
        uint256 id = nextId++;
        batches[id] = Batch(id, sku, origin, block.timestamp, msg.sender, metadataURI);
        emit BatchRegistered(id, sku, origin, msg.sender);
        return id;
    }

    function transferBatch(uint256 id, address to) external {
        require(batches[id].owner == msg.sender, "Not owner");
        batches[id].owner = to;
    }

    function getBatch(uint256 id) external view returns (Batch memory) {
        return batches[id];
    }
}
