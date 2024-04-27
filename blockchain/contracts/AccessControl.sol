// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract MACAccessControl is AccessControl {
    // Define role identifiers
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant ADVERTISER_ROLE = keccak256("ADVERTISER_ROLE");
    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    // Constructor to set up roles
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _setRoleAdmin(ADVERTISER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(CREATOR_ROLE, ADMIN_ROLE);
        _setRoleAdmin(USER_ROLE, ADMIN_ROLE);
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
    function assignUserRole() public {
        grantRole(USER_ROLE, msg.sender);
    }

    // Function to revoke the User role from a user
    function revokeUserRole() public {
        revokeRole(USER_ROLE, msg.sender);
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
        return hasRole(USER_ROLE, account);
    }

    function isUserMsgSender() public view returns (bool) {
        return hasRole(USER_ROLE, msg.sender);
    }
}
