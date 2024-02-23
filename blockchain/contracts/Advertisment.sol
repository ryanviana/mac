// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AdvertismentContract is Ownable {
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

    uint256 public nextAdvertismentId;
    mapping(uint256 => Advertisment) public advertisments;

    event AdvertismentCreated(
        uint256 indexed id,
        address indexed advertiser,
        address indexed creator,
        uint256 budget
    );
    event AdvertismentEnded(uint256 indexed id);
    event AdvertismentAccepted(uint256 indexed id, address indexed creator);
    event AdvertismentRejected(uint256 indexed id, address indexed creator);
    event AdvertismentActive(uint256 indexed id);

    constructor() Ownable(msg.sender) {
        nextAdvertismentId = 1;
    }

    function createAdvertisment(
        address _creator,
        uint256 _budget,
        address _token,
        uint256 _milestoneThreshold,
        uint256 _CPM
    ) public returns (uint256) {
        uint256 newAdvertismentId = nextAdvertismentId; // Store the current nextAdvertismentId

        Advertisment memory newAdvertisment = Advertisment({
            id: newAdvertismentId,
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

        advertisments[newAdvertismentId] = newAdvertisment;

        emit AdvertismentCreated(
            newAdvertismentId,
            msg.sender,
            _creator,
            _budget
        );

        nextAdvertismentId++; // Increment the ID for the next Advertisment

        return newAdvertismentId; // Return the new Advertisment ID
    }

    function acceptAdvertisment(uint256 _advertismentId) public {
        require(
            tx.origin == advertisments[_advertismentId].creator,
            "Only the creator can accept this advertisment"
        );
        require(
            advertisments[_advertismentId].isAccepted == false,
            "Advertisment already accepted"
        );
        advertisments[_advertismentId].isAccepted = true;
        advertisments[_advertismentId].isActive = true; // Mark the campaign as ended

        emit AdvertismentAccepted(_advertismentId, tx.origin);
    }

    function rejectAdvertisment(uint256 _advertismentId) public {
        require(
            tx.origin == advertisments[_advertismentId].creator,
            "Only the creator can reject this advertisment"
        );
        require(
            advertisments[_advertismentId].isAccepted == false,
            "Advertisment already accepted"
        );
        delete advertisments[_advertismentId];
        emit AdvertismentRejected(_advertismentId, tx.origin);
    }

    function getAdvertisment(
        uint256 _advertismentId
    ) public view returns (Advertisment memory) {
        return advertisments[_advertismentId];
    }

    function emitActiveAdvertismentsLogs() public {
        for (uint256 i = 1; i < nextAdvertismentId; i++) {
            if (advertisments[i].isActive) {
                emit AdvertismentActive(i);
            }
        }
    }

    function setClicks(uint256 _advertismentId, uint256 _clicks) public {
        // require(
        //     msg.sender == address(clickCountFunction),
        //     "Only the click count function can set the clicks"
        // );
        advertisments[_advertismentId].clicks = _clicks;
    }

    function setAmountToBePaid(
        uint256 _advertismentId,
        uint256 _amountToBePaid
    ) public {
        // require(
        //     msg.sender == address(clickCountFunction),
        //     "Only the click count function can set the amount to be paid"
        // );
        advertisments[_advertismentId].amountToBePaid = _amountToBePaid;
    }
}
