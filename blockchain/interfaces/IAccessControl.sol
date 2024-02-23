// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IAccessControl {
    // Public constant role identifiers
    function ADMIN_ROLE() external view returns (bytes32);
    function ADVERTISER_ROLE() external view returns (bytes32);
    function CREATOR_ROLE() external view returns (bytes32);

    // Function signatures
    function assignAdvertiserRole(address user) external;
    function revokeAdvertiserRole(address user) external;
    function assignCreatorRole(address user) external;
    function revokeCreatorRole(address user) external;

    function hasRole(
        bytes32 role,
        address account
    ) external view returns (bool);

    function grantRole(bytes32 role, address account) external;

    function isCreator(address account) external view returns (bool);
    function isAdvertiser(address account) external view returns (bool);
    function isAdmin(address account) external view returns (bool);
}
