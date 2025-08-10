
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ReferralCommission {
    address public admin;
    mapping(address => uint256) public commissionBalance;
    mapping(address => address) public referredBy; // user -> referrer
    event Referred(address user, address referrer);
    event CommissionCredited(address referrer, uint256 amount);
    event CommissionWithdrawn(address referrer, uint256 amount);

    constructor() {
        admin = msg.sender;
    }

    function setReferrer(address user, address referrer) external {
        require(referredBy[user] == address(0), "Referrer already set");
        require(user != referrer, "Cannot refer self");
        referredBy[user] = referrer;
        emit Referred(user, referrer);
    }

    function creditCommission(address referrer) external payable {
        require(referrer != address(0), "Invalid referrer");
        commissionBalance[referrer] += msg.value;
        emit CommissionCredited(referrer, msg.value);
    }

    function withdrawCommission() external {
        uint256 amount = commissionBalance[msg.sender];
        require(amount > 0, "No commission");
        commissionBalance[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit CommissionWithdrawn(msg.sender, amount);
    }

    // Admin functions
    function adminWithdraw(uint256 amount, address to) external {
        require(msg.sender == admin, "Only admin");
        payable(to).transfer(amount);
    }

    receive() external payable {}
}
