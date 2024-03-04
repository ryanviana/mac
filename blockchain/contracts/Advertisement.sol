// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AdvertisementContract is Ownable {
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

    uint256 public nextAdvertisementId;
    mapping(uint256 => Advertisement) public advertisements;

    event AdvertisementCreated(
        uint256 indexed id,
        address indexed advertiser,
        address indexed creator,
        uint256 budget
    );
    event AdvertisementEnded(uint256 indexed id);
    event AdvertisementAccepted(uint256 indexed id, address indexed creator);
    event AdvertisementRejected(uint256 indexed id, address indexed creator);
    event AdvertisementActive(uint256 indexed id);

    constructor() Ownable(msg.sender) {
        nextAdvertisementId = 1;
    }

    function createAdvertisement(
        uint256 _id,
        address _creator,
        uint256 _budget,
        address _token,
        uint256 _milestoneThreshold,
        uint256 _CPM
    ) public {
        Advertisement memory newAdvertisement = Advertisement({
            id: _id,
            advertiser: msg.sender,
            creator: _creator,
            budget: _budget,
            isAccepted: false,
            token: _token,
            isFunded: false,
            isActive: true,
            milestoneThreshold: _milestoneThreshold,
            CPM: _CPM,
            amountToBePaid: 0,
            clicks: 0
        });

        advertisements[_id] = newAdvertisement;

        emit AdvertisementCreated(_id, msg.sender, _creator, _budget);
    }

    function acceptAdvertisement(uint256 _advertisementId) public {
        require(
            tx.origin == advertisements[_advertisementId].creator,
            "Only the creator can accept this advertisement"
        );
        require(
            advertisements[_advertisementId].isAccepted == false,
            "Advertisement already accepted"
        );
        advertisements[_advertisementId].isAccepted = true;
        advertisements[_advertisementId].isActive = true; // Mark the campaign as ended

        emit AdvertisementAccepted(_advertisementId, tx.origin);
    }

    function rejectAdvertisement(uint256 _advertisementId) public {
        require(
            tx.origin == advertisements[_advertisementId].creator,
            "Only the creator can reject this advertisement"
        );
        require(
            advertisements[_advertisementId].isAccepted == false,
            "Advertisement already accepted"
        );
        delete advertisements[_advertisementId];
        emit AdvertisementRejected(_advertisementId, tx.origin);
    }

    function getAdvertisement(
        uint256 _advertisementId
    ) public view returns (Advertisement memory) {
        return advertisements[_advertisementId];
    }

    function emitActiveAdvertisementsLogs() public {
        for (uint256 i = 1; i < nextAdvertisementId; i++) {
            if (advertisements[i].isActive) {
                emit AdvertisementActive(i);
            }
        }
    }

    function setClicks(uint256 _advertisementId, uint256 _clicks) public {
        // require(
        //     msg.sender == address(clickCountFunction),
        //     "Only the click count function can set the clicks"
        // );
        advertisements[_advertisementId].clicks = _clicks;
    }

    function setAmountToBePaid(
        uint256 _advertisementId,
        uint256 _amountToBePaid
    ) public {
        // require(
        //     msg.sender == address(clickCountFunction),
        //     "Only the click count function can set the amount to be paid"
        // );
        advertisements[_advertisementId].amountToBePaid = _amountToBePaid;
    }
}
