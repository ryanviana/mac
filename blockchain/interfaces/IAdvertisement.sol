// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IAdvertisement {
    struct Advertisement {
        uint256 id;
        address advertiser;
        address creator;
        uint256 budget;
        bool isAccepted;
        address token;
        bool isFunded;
        bool isActive;
        uint256 milestoneThreshold;
        uint256 CPM;
        uint256 amountToBePaid;
        uint256 clicks;
    }

    event AdvertisementCreated(
        uint256 indexed id,
        address indexed advertiser,
        address indexed creator,
        uint256 budget
    );
    event CampaignEnded(uint256 indexed id);
    event AdvertisementAccepted(uint256 indexed id, address indexed creator);
    event AdvertisementRejected(uint256 indexed id, address indexed creator);

    function createAdvertisement(
        uint256 _id,
        address _creator,
        uint256 _budget,
        address _token,
        uint256 _milestoneThreshold,
        uint256 _CPM
    ) external;

    function acceptAdvertisement(uint256 _advertisementId) external;

    function rejectAdvertisement(uint256 _advertisementId) external;

    function getAdvertisement(
        uint256 _advertisementId
    ) external view returns (Advertisement memory);

    function emitActiveAdvertisementsLogs() external;

    function setClicks(uint256 _advertisementId, uint256 _clicks) external;
    function setAmountToBePaid(
        uint256 _advertisementId,
        uint256 _amountToBePaid
    ) external;
    // Any other public functions or variables that need to be accessed externally
}
