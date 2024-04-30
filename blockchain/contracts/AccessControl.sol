// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract MACAccessControl is AccessControl {
    // Define role identifiers
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant ADVERTISER_ROLE = keccak256("ADVERTISER_ROLE");
    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");

    mapping(address => bool) users;
    mapping(address => uint256) lastCheckInTime; // Mapeia o último horário de check-in de cada endereço

    uint256 constant checkInInterval = 6 hours; // Intervalo de tempo entre os check-ins

    // Constructor to set up roles
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _setRoleAdmin(ADVERTISER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(CREATOR_ROLE, ADMIN_ROLE);
    }

    //Check-in function
    function checkIn() public returns (bool) {
        require(
            block.timestamp >= lastCheckInTime[msg.sender] + checkInInterval,
            "You must wait 6 hours from the last check-in"
        );

        lastCheckInTime[msg.sender] = block.timestamp;
        return true;      
    }

    // Function to assign the Advertiser role to a user
    function assignAdvertiserRole(address user) public onlyRole(ADMIN_ROLE) {
        grantRole(ADVERTISER_ROLE, user);
    }

    // Function to revoke the Advertiser role from a user
    function revokeAdvertiserRole(address user) public onlyRole(ADMIN_ROLE) {
        revokeRole(ADVERTISER_ROLE, user);
    }

    // Function to assign the Creator role to a user
    function assignCreatorRole(address user) public onlyRole(ADMIN_ROLE) {
        grantRole(CREATOR_ROLE, user);
    }

    // Function to revoke the Creator role from a user
    function revokeCreatorRole(address user) public onlyRole(ADMIN_ROLE) {
        revokeRole(CREATOR_ROLE, user);
    }

    // Function to assign the User role to a user
    function assignUserRole() public returns (bool) {
        users[msg.sender] = true;

        return true;
    }

    // Function to revoke the User role from a user
    function revokeUserRole() public returns(bool) {
        users[msg.sender] = false;

        return true;
    }

    function isCreator(address account) public view returns (bool) {
        return hasRole(CREATOR_ROLE, account);
    }

    function isAdvertiser(address account) public view returns (bool) {
        return hasRole(ADVERTISER_ROLE, account);
    }

    function isAdmin(address account) public view returns (bool) {
        return hasRole(ADMIN_ROLE, account);
    }

    function isUser(address account) public view returns (bool) {
        return users[account];
    }

    function isUserMsgSender() public view returns (bool) {
        return users[msg.sender];
    }

    function getLastCheckInTime(address _user) public view returns (uint256) {
        return lastCheckInTime[_user];
    }
}