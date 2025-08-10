
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract EscrowPayment {
    address public arbiter;
    address public payer;
    address public payee;
    uint256 public amount;
    bool public released;

    constructor(address _payer, address _payee, address _arbiter) payable {
        payer = _payer;
        payee = _payee;
        arbiter = _arbiter;
        amount = msg.value;
        released = false;
    }

    function release() external {
        require(msg.sender == arbiter, "Only arbiter");
        require(!released, "Already released");
        released = true;
        payable(payee).transfer(amount);
    }

    function refund() external {
        require(msg.sender == arbiter, "Only arbiter");
        require(!released, "Already released");
        released = true;
        payable(payer).transfer(amount);
    }
}
