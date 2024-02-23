// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IAdvertisment {
    struct Advertisment {
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

    event AdvertismentCreated(
        uint256 indexed id,
        address indexed advertiser,
        address indexed creator,
        uint256 budget
    );
    event CampaignEnded(uint256 indexed id);
    event AdvertismentAccepted(uint256 indexed id, address indexed creator);
    event AdvertismentRejected(uint256 indexed id, address indexed creator);

    function createAdvertisment(
        address _creator,
        uint256 _budget,
        address _token,
        uint256 _milestoneThreshold,
        uint256 _CPM
    ) external returns (uint256);

    function acceptAdvertisment(uint256 _advertismentId) external;

    function rejectAdvertisment(uint256 _advertismentId) external;

    function getAdvertisment(
        uint256 _advertismentId
    ) external view returns (Advertisment memory);

    function emitActiveAdvertismentsLogs() external;

    function setClicks(uint256 _advertismentId, uint256 _clicks) external;
    function setAmountToBePaid(
        uint256 _advertismentId,
        uint256 _amountToBePaid
    ) external;
    // Any other public functions or variables that need to be accessed externally
}
