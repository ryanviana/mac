// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/IAdvertisment.sol";
import "../interfaces/IPayment.sol";
import "../interfaces/IAccessControl.sol";

contract MacMain {
    IAdvertisment public advertismentContract;
    IPayment public paymentContract;
    IAccessControl public accessControlContract;

    constructor(
        address _advertismentContractAddress,
        address _paymentContractAddress,
        address _accessControlContractAddress
    ) {
        advertismentContract = IAdvertisment(_advertismentContractAddress);
        paymentContract = IPayment(_paymentContractAddress);
        accessControlContract = IAccessControl(_accessControlContractAddress);
    }

    // ADVERTISMENT FUNCTIONS
    function createAdvertisment(
        address creator,
        uint256 budget,
        address token,
        uint256 milestoneThreshold,
        uint256 CPM
    ) public {
        require(
            accessControlContract.hasRole(
                accessControlContract.ADVERTISER_ROLE(),
                msg.sender
            ),
            "Caller is not an advertiser"
        );

        advertismentContract.createAdvertisment(
            creator,
            budget,
            token,
            milestoneThreshold,
            CPM
        );
    }

    function acceptAdvertisment(uint256 advertismentId) public {
        require(
            accessControlContract.hasRole(
                accessControlContract.CREATOR_ROLE(),
                msg.sender
            ),
            "Caller is not a creator"
        );
        advertismentContract.acceptAdvertisment(advertismentId);
    }

    function rejectAdvertisment(uint256 advertismentId) public {
        require(
            accessControlContract.hasRole(
                accessControlContract.CREATOR_ROLE(),
                msg.sender
            ),
            "Caller is not a creator"
        );
        advertismentContract.rejectAdvertisment(advertismentId);
    }

    function getAdvertisment(
        uint256 id
    ) public view returns (IAdvertisment.Advertisment memory) {
        return advertismentContract.getAdvertisment(id);
    }

    function hasRole(bytes32 role, address account) public view returns (bool) {
        return accessControlContract.hasRole(role, account);
    }

    function grantCreatorRole(address account) public {
        require(
            accessControlContract.hasRole(
                accessControlContract.ADVERTISER_ROLE(),
                msg.sender
            ),
            "Caller is an advertiser"
        );
        accessControlContract.grantRole(
            accessControlContract.CREATOR_ROLE(),
            account
        );
    }

    function grantAdvertiserRole(address account) public {
        require(
            accessControlContract.hasRole(
                accessControlContract.CREATOR_ROLE(),
                msg.sender
            ),
            "Caller is a creator"
        );
        accessControlContract.grantRole(
            accessControlContract.ADVERTISER_ROLE(),
            account
        );
    }
}
