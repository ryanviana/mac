// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DisputeResolutionContract is Ownable {
    enum DisputeStatus {
        Open,
        Resolved,
        Rejected
    }

    struct Dispute {
        uint256 id;
        address advertiser;
        address creator;
        string reason;
        DisputeStatus status;
    }

    uint256 public nextDisputeId;
    mapping(uint256 => Dispute) public disputes;

    event DisputeCreated(
        uint256 indexed disputeId,
        address indexed advertiser,
        address indexed creator,
        string reason
    );
    event DisputeResolved(uint256 indexed disputeId);
    event DisputeRejected(uint256 indexed disputeId);

    constructor() Ownable(msg.sender) {
        nextDisputeId = 1;
    }

    // Function to create a dispute
    function createDispute(address _creator, string memory _reason) public {
        disputes[nextDisputeId] = Dispute({
            id: nextDisputeId,
            advertiser: msg.sender,
            creator: _creator,
            reason: _reason,
            status: DisputeStatus.Open
        });

        emit DisputeCreated(nextDisputeId, msg.sender, _creator, _reason);
        nextDisputeId++;
    }

    // Function to resolve a dispute
    function resolveDispute(uint256 _disputeId) public onlyOwner {
        require(
            disputes[_disputeId].status == DisputeStatus.Open,
            "Dispute is not open"
        );

        disputes[_disputeId].status = DisputeStatus.Resolved;
        emit DisputeResolved(_disputeId);
    }

    // Function to reject a dispute
    function rejectDispute(uint256 _disputeId) public onlyOwner {
        require(
            disputes[_disputeId].status == DisputeStatus.Open,
            "Dispute is not open"
        );

        disputes[_disputeId].status = DisputeStatus.Rejected;
        emit DisputeRejected(_disputeId);
    }

    // Additional functions as needed
}
