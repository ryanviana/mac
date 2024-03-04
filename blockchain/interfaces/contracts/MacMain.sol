// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/IAdvertisement.sol";
import "../interfaces/IPayment.sol";
import "../interfaces/IAccessControl.sol";

contract MacMain {
    IAdvertisement public advertisementContract;
    IPayment public paymentContract;
    IAccessControl public accessControlContract;

    constructor(
        address _advertisementContractAddress,
        address _paymentContractAddress,
        address _accessControlContractAddress
    ) {
        advertisementContract = IAdvertisement(_advertisementContractAddress);
        paymentContract = IPayment(_paymentContractAddress);
        accessControlContract = IAccessControl(_accessControlContractAddress);
    }

    // ADVERTISMENT FUNCTIONS
    function createAdvertisement(
        uint256 id,
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

        advertisementContract.createAdvertisement(
            id,
            creator,
            budget,
            token,
            milestoneThreshold,
            CPM
        );
    }

    function acceptAdvertisement(uint256 advertisementId) public {
        require(
            accessControlContract.hasRole(
                accessControlContract.CREATOR_ROLE(),
                msg.sender
            ),
            "Caller is not a creator"
        );
        advertisementContract.acceptAdvertisement(advertisementId);
    }

    function rejectAdvertisement(uint256 advertisementId) public {
        require(
            accessControlContract.hasRole(
                accessControlContract.CREATOR_ROLE(),
                msg.sender
            ),
            "Caller is not a creator"
        );
        advertisementContract.rejectAdvertisement(advertisementId);
    }

    function getAdvertisement(
        uint256 id
    ) public view returns (IAdvertisement.Advertisement memory) {
        return advertisementContract.getAdvertisement(id);
    }

    function isAccepted(uint256 id) public view returns (bool) {
        return advertisementContract.getAdvertisement(id).isAccepted;
    }

    function isActive(uint256 id) public view returns (bool) {
        return advertisementContract.getAdvertisement(id).isActive;
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
